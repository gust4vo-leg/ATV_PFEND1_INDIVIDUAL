import pool from "../config/database.js";
import { unlink } from "node:fs/promises";
import path from "node:path";

export const listarNoticias = async (req, res) => {
  try {
    const { categoria } = req.query;

    const categoriasPrincipais = [
      "Futebol",
      "Basquete",
      "Vôlei",
      "Fórmula 1",
      "Futebol Americano",
    ];

    let query = "SELECT * FROM noticias";
    const params = [];

    if (categoria === "Outros") {
      const placeholders = categoriasPrincipais.map(() => "?").join(", ");

      query += ` WHERE categoria NOT IN (${placeholders})`;
      params.push(...categoriasPrincipais);
    } else if (categoria && categoria !== "Todas") {
      query += " WHERE categoria = ?";
      params.push(categoria);
    }

    query += " ORDER BY data_publicacao DESC, idNoticias DESC";

    const [rows] = await pool.query(query, params);

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao buscar notícias",
    });
  }
};

export const listarDestaques = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM noticias
      ORDER BY data_publicacao DESC, idNoticias DESC
      LIMIT 3
    `);

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao buscar notícias do carrossel",
    });
  }
};

export async function criarNoticia(req, res) {
  try {
    const { titulo, categoria, descricao, conteudo, data_publicacao } =
      req.body;

    if (
      typeof titulo !== "string" ||
      !titulo.trim() ||
      typeof categoria !== "string" ||
      !categoria.trim() ||
      typeof descricao !== "string" ||
      !descricao.trim() ||
      typeof conteudo !== "string" ||
      !conteudo.trim()
    ) {
      return res.status(400).json({
        mensagem: "Preencha todos os campos obrigatórios.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        mensagem: "Selecione uma imagem para a notícia.",
      });
    }

    if (titulo.trim().length > 500) {
      return res.status(400).json({
        mensagem: "O título deve ter no máximo 500 caracteres.",
      });
    }

    if (categoria.trim().length > 255) {
      return res.status(400).json({
        mensagem: "A categoria deve ter no máximo 255 caracteres.",
      });
    }

    if (descricao.trim().length > 500) {
      return res.status(400).json({
        mensagem: "A descrição deve ter no máximo 500 caracteres.",
      });
    }

    let data = null;

    if (data_publicacao) {
      if (
        typeof data_publicacao !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(data_publicacao)
      ) {
        return res.status(400).json({
          mensagem: "Informe uma data de publicação válida.",
        });
      }

      const [ano, mes, dia] = data_publicacao.split("-").map(Number);
      const dataVerificada = new Date(Date.UTC(ano, mes - 1, dia));

      if (
        dataVerificada.getUTCFullYear() !== ano ||
        dataVerificada.getUTCMonth() !== mes - 1 ||
        dataVerificada.getUTCDate() !== dia
      ) {
        return res.status(400).json({
          mensagem: "A data de publicação informada não existe.",
        });
      }

      data = `${data_publicacao} 12:00:00`;
    }

    const imagem = `/uploads/${req.file.filename}`;

    const sql = `
      INSERT INTO noticias
        (titulo, categoria, descricao, conteudo, imagem, data_publicacao)
      VALUES (?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))
    `;

    const [resultado] = await pool.execute(sql, [
      titulo.trim(),
      categoria.trim(),
      descricao.trim(),
      conteudo.trim(),
      imagem,
      data,
    ]);

    return res.status(201).json({
      mensagem: "Notícia cadastrada com sucesso!",
      noticia: {
        idNoticias: resultado.insertId,
        titulo: titulo.trim(),
        categoria: categoria.trim(),
        descricao: descricao.trim(),
        conteudo: conteudo.trim(),
        imagem,
        data_publicacao: data,
      },
    });
  } catch (erro) {
    console.error("Erro ao cadastrar notícia:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar a notícia.",
    });
  }
}

export const buscarNoticiaPorId = async (req, res) => {
  try {
    const { idNoticias } = req.params;
    if (!idNoticias || idNoticias === "undefined") {
      return res.status(400).json({ error: "ID não fornecido ou inválido." });
    }
    const [rows] = await pool.query(
      "SELECT * FROM noticias WHERE idNoticias = ?",
      [idNoticias],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Notícia não encontrada." });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar notícia por ID no MySQL:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export async function excluirNoticia(req, res) {
  try {
    const { idNoticias } = req.params;

    if (!/^\d+$/.test(idNoticias)) {
      return res.status(400).json({
        mensagem: "ID da notícia inválido.",
      });
    }

    const [noticias] = await pool.execute(
      "SELECT imagem FROM noticias WHERE idNoticias = ?",
      [idNoticias],
    );

    if (noticias.length === 0) {
      return res.status(404).json({
        mensagem: "Notícia não encontrada.",
      });
    }

    const imagem = noticias[0].imagem;

    await pool.execute("DELETE FROM noticias WHERE idNoticias = ?", [
      idNoticias,
    ]);

    if (imagem && imagem.startsWith("/uploads/")) {
      const nomeArquivo = path.basename(imagem);
      const caminhoImagem = path.resolve("uploads", nomeArquivo);

      try {
        await unlink(caminhoImagem);
      } catch (erroArquivo) {
        if (erroArquivo.code !== "ENOENT") {
          console.error("Erro ao apagar a imagem:", erroArquivo);
        }
      }
    }

    return res.status(200).json({
      mensagem: "Notícia excluída com sucesso!",
    });
  } catch (erro) {
    console.error("Erro ao excluir notícia:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao excluir a notícia.",
    });
  }
}
