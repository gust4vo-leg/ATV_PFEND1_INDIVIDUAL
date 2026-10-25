import jwt from "jsonwebtoken";

export function verificarAutenticacao(req, res, next) {
  const token = req.cookies?.token_admin;

  if (!token) {
    return res.status(401).json({
      mensagem: "Acesso não autorizado.",
    });
  }

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);

    req.administrador = dados;

    next();
  } catch {
    return res.status(401).json({
      mensagem: "Sessão inválida ou expirada.",
    });
  }
}
