import pool from "../config/database.js";

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

export const criarNoticia = async (req, res) => {
  const { titulo, categoria, descricao, conteudo, imagem } = req.body;

  if (!titulo || !categoria || !descricao || !conteudo) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const query =
      "INSERT INTO noticias (titulo, categoria, descricao, conteudo, imagem) VALUES (?, ?, ?, ?, ?)";

    const [result] = await pool.query(query, [
      titulo,
      categoria,
      descricao,
      conteudo,
      imagem,
    ]);

    return res.status(201).json({
      message: "Notícia criada com sucesso!",
      idNoticias: result.insertId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao salvar a notícia." });
  }
};

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
