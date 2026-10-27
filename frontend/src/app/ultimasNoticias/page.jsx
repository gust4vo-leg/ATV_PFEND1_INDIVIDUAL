"use client";

import "./ultimas.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CardUltimasNoticias from "@/components/ultimasNoticias";

export default function UltimasNoticias() {
  const searchParams = useSearchParams();
  const categoriaUrl = searchParams.get("categoria");

  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  const categorias = [
    "Todas",
    "Futebol",
    "Basquete",
    "Vôlei",
    "Fórmula 1",
    "Futebol Americano",
    "Outros",
  ];

  useEffect(() => {
    if (categoriaUrl && categorias.includes(categoriaUrl)) {
      setCategoriaSelecionada(categoriaUrl);
    } else {
      setCategoriaSelecionada("Todas");
    }
  }, [categoriaUrl]);

  useEffect(() => {
    setCarregando(true);
    setErro("");

    const url =
      categoriaSelecionada === "Todas"
        ? "http://localhost:3005/api/noticias"
        : `http://localhost:3005/api/noticias?categoria=${encodeURIComponent(
            categoriaSelecionada,
          )}`;

    fetch(url)
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
  }, [categoriaSelecionada]);

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
            {categorias.map((categoria) => (
              <li
                key={categoria}
                className={categoriaSelecionada === categoria ? "active" : ""}
                onClick={() => setCategoriaSelecionada(categoria)}
              >
                {categoria}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-cards-ultimas">
        {carregando ? (
          <p>Carregando notícias...</p>
        ) : erro ? (
          <p>{erro}</p>
        ) : noticias.length === 0 ? (
          <p style={{ color: "#fff", margin: "10px" }}>
            Nenhuma notícia cadastrada.
          </p>
        ) : (
          <CardUltimasNoticias UltimasNoticias={noticias} />
        )}
      </div>
    </main>
  );
}
