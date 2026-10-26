"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./sidebarAdmin.css";
import Link from "next/link";

export default function Sidebar() {
  const router = useRouter();
  const [saindo, setSaindo] = useState(false);
  const [erroLogout, setErroLogout] = useState("");

  async function fazerLogout() {
    if (saindo) return;

    setSaindo(true);
    setErroLogout("");

    try {
      const resposta = await fetch("http://localhost:3005/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível encerrar a sessão.");
      }

      router.replace("/adminNoticias/login");
    } catch (erro) {
      setErroLogout(erro.message || "Erro ao sair. Tente novamente.");
      setSaindo(false);
    }
  }

  return (
    <section id="sidebar">
      <div className="logo-sidebar">
        <img src="/imagens/logo.png" alt="CronoSport" />
      </div>

      <div className="divisoria-sidebar"></div>

      <nav className="sidebar">
        <ul>
          <li>
            <Link
              href="/adminNoticias"
              style={{ color: "var(--color-text-inverse)" }}
            >
              Todas as notícias
            </Link>
          </li>

          <li>
            <Link
              href="/adminNoticias/adicionar"
              style={{ color: "var(--color-text-inverse)" }}
            >
              Adicionar notícias
            </Link>
          </li>

          <li>
            <Link href="/">← Voltar ao site</Link>
          </li>
        </ul>
      </nav>

      <div className="divisoria-sidebar"></div>

      <div className="sidebar-bottom">
        <div className="usuario">
          <span>Administrador</span>
        </div>
      </div>
    </section>
  );
}
