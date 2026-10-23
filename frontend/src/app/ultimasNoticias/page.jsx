"use client";

import "./ultimas.css";
import { useEffect, useState } from "react";
import CardUltimasNoticias from "@/components/ultimasNoticias";

export default function UltimasNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("http://localhost:3005/api/noticias")
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar as notícias.");
        }
        return resposta.json();
      })
      .then((dados) => {
        setNoticias(dados);
      })
      .catch((error) => {
        setErro(error.message);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  return (
    <main id="ultimasNoticias">
      <div className="hero-ultimas">
        <div className="top-hero-ultimas">
          <h2>NOTÍCIAS</h2>
        </div>

        <span>
          Fique por dentro de tudo o que acontece no mundo esportivo. Aqui você
          encontra as notícias mais recentes, análises, bastidores e muito mais.
        </span>
      </div>

      <div className="filtro">
        <nav className="filtro-ultimas">
          <ul>
            <li className="active">Todas</li>
            <li>Futebol</li>
            <li>Basquete</li>
            <li>Vôlei</li>
            <li>Fórmula 1</li>
            <li>Futebol Americano</li>
            <li>Outros</li>
          </ul>
        </nav>

        <button className="btn-filtro-data">
          <i className="bi bi-funnel-fill"></i>
          <span>Mais recentes primeiro</span>
          <i className="bi bi-sort-down"></i>
        </button>
      </div>

      <div className="container-cards-ultimas">
        {carregando ? (
          <p>Carregando notícias...</p>
        ) : erro ? (
          <p>{erro}</p>
        ) : noticias.length === 0 ? (
          <p>Nenhuma notícia cadastrada.</p>
        ) : (
          <CardUltimasNoticias UltimasNoticias={noticias} />
        )}
      </div>
    </main>
  );
}
