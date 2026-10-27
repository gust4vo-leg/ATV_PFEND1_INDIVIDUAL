"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "./id.css";

export default function Noticia() {
  const [noticia, setNoticia] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const params = useParams();

  useEffect(() => {
    const idNoticias = params?.idNoticias;

    if (!idNoticias) {
      setErro("ID da notícia não informado.");
      setCarregando(false);
      return;
    }

    async function buscarNoticia() {
      try {
        const res = await fetch(
          `http://localhost:3005/api/noticias/${idNoticias}`,
        );

        if (!res.ok) {
          throw new Error("Não foi possível encontrar essa notícia no banco.");
        }

        const data = await res.json();
        console.log("Notícia recebida do banco:", data);
        setNoticia(data);
      } catch (erro) {
        console.error("Erro ao buscar notícia:", erro);
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarNoticia();
  }, [params?.idNoticias]);

  if (carregando) {
    return <p>Carregando dados da notícia...</p>;
  }

  if (erro) {
    return (
      <section style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Aviso</h2>
        <p>{erro}</p>
      </section>
    );
  }

  if (!noticia) {
    return <p>Notícia não encontrada.</p>;
  }

  return (
    <section className="pagina-noticia">
      <div className="container-pagina-noticia">
        <h1 className="titulo">{noticia.titulo}</h1>
        <span className="categoria-noticia">{noticia.categoria}</span>
        <p>{noticia.descricao}</p>

        <div className="imagem-pagina-noticia">
          {noticia.imagem && (
            <img
              src={
                noticia.imagem
                  ? noticia.imagem.startsWith("http")
                    ? noticia.imagem
                    : `http://localhost:3005${
                        noticia.imagem.startsWith("/")
                          ? noticia.imagem
                          : `/${noticia.imagem}`
                      }`
                  : "/imagem-indisponivel.png"
              }
              alt={noticia.titulo}
              className="imagem-noticia"
              onError={(event) => {
                console.error(
                  "Não foi possível carregar a imagem:",
                  event.currentTarget.src,
                );
              }}
            />
          )}
        </div>
        <p className="data-publicada">
          Publicado em:{" "}
          {new Date(noticia.data_publicacao).toLocaleDateString("pt-BR")}
        </p>

        <div className="conteudo-noticia">{noticia.conteudo}</div>
      </div>
    </section>
  );
}
