import pool from "../config/database.js"; 

export const listarNoticias = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM noticias ORDER BY data_publicacao DESC, idNoticias DESC",
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar notícias" });
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
      error: "Erro ao buscar notícias do carrossel"
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
      imagem
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
      if (!idNoticias || idNoticias === 'undefined') {
          return res.status(400).json({ error: 'ID não fornecido ou inválido.' });
      }
      const [rows] = await pool.query("SELECT * FROM noticias WHERE idNoticias = ?", [idNoticias]);

      if (rows.length === 0) {
          return res.status(404).json({ error: 'Notícia não encontrada.' });
      }

      return res.status(200).json(rows[0]);

  } catch (error) {
      console.error('Erro ao buscar notícia por ID no MySQL:', error);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};
