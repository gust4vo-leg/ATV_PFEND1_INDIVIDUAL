"use client";

import { useState, useEffect } from "react";
import "./destaqueNoticias.css";

export default function Destaque() {
  const [destaques, setDestaques] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3005/api/noticias")
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar as notícias");
        }
        return resposta.json();
      })
      .then((mainDestaques) => {
        setDestaques(mainDestaques);
      })
      .catch((error) => {
        setErro(error.message);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);
  return (
    <>
      {carregando && <p>Carregando notícias...</p>}

      {erro && <p>{erro}</p>}

      {!carregando && !erro && destaques.length === 0 && (
        <p>Nenhuma notícia cadastrada.</p>
      )}

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {destaques.slice(0, 4).map((noticia) => (
          <div className="col" key={noticia.idNoticias}>
            <div className="card h-100">
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
                className="card-img-top"
                onError={(event) => {
                  console.error(
                    "Não foi possível carregar a imagem:",
                    event.currentTarget.src,
                  );
                }}
              />

              <div className="card-body">
                <div className="categoria">{noticia.categoria}</div>

                <h5 className="card-title">{noticia.titulo}</h5>

                <p className="card-text">{noticia.descricao}</p>
              </div>

              <div className="card-footer">
                <small className="text-body-secondary">
                  {new Date(noticia.data_publicacao).toLocaleDateString(
                    "pt-BR",
                  )}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
