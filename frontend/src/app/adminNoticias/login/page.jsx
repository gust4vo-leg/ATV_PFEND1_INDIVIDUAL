"use client";

import "./login.css";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:3005/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.mensagem || "Não foi possível fazer login.");
        return;
      }

      window.location.href = "/adminNoticias";
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section id="login">
      <div className="login-container">
        <h1>Acesso Administrativo</h1>

        <p className="login-descricao">
          Faça login para acessar o painel de gerenciamento de notícias da
          CronoSport.
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              E-mail
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label for="inputPassword5" class="form-label">
              Password
            </label>
            <input
              type="password"
              id="inputPassword5"
              class="form-control"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              aria-describedby="passwordHelpBlock"
              required
            />
          </div>

          {erro && (
            <p className="login-erro" role="alert">
              {erro}
            </p>
          )}

          <button type="submit" className="login-botao" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar no painel"}
          </button>
        </form>

        <a href="/" className="login-voltar">
          ← Voltar para o site
        </a>
      </div>
    </section>
  );
}
