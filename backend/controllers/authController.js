import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";

export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: "Informe o e-mail e a senha.",
      });
    }

    const [administradores] = await pool.execute(
      "SELECT id, nome, email, senha FROM administradores WHERE email = ?",
      [email.trim().toLowerCase()],
    );

    if (administradores.length === 0) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos.",
      });
    }

    const admin = administradores[0];

    const senhaValida = await bcrypt.compare(senha, admin.senha);

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos.",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token_admin", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      administrador: {
        id: admin.id,
        nome: admin.nome,
        email: admin.email,
      },
    });
  } catch (erro) {
    console.error("Erro no login:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao realizar login.",
    });
  }
}

export function logout(req, res) {
  res.clearCookie("token_admin", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    mensagem: "Sessão encerrada com sucesso.",
  });
}

export function logout(req, res) {
  res.clearCookie("token_admin", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    mensagem: "Logout realizado com sucesso.",
  });
}
