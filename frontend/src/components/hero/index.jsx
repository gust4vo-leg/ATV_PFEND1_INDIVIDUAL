"use client";

import "./hero.css";
import { useEffect, useState } from "react";

export default function Hero() {
  const [noticias, setNoticias] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3005/api/noticias").then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar as notícias.");
        }
        return resposta.json();
      }),

      fetch("http://localhost:3005/api/noticias/destaques").then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os destaques.");
        }
        return resposta.json();
      }),
    ])
      .then(([dados, dadosDestaques]) => {
        setNoticias(dados);
        setDestaques(dadosDestaques);
      })
      .catch((error) => {
        setErro(error.message);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  return (
    <div className="hero">
      <div className="hero-left">
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ width: "1000px", height: "auto" }}
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            {(destaques || []).map((noticia, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={noticia.idNoticias}
              >
                <img
                  src={noticia.imagem}
                  className="d-block w-100"
                  alt={noticia.titulo}
                />

                <div className="carousel-caption d-none d-md-block">
                  <div className="categoria">{noticia.categoria}</div>
                  <h5>{noticia.titulo}</h5>
                  <p>{noticia.descricao}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="hero-right">
        <div className="top-right">
          <p>ÚLTIMAS NOTÍCIAS</p>
        </div>

        {carregando && <p>Carregando notícias...</p>}

        {erro && <p>{erro}</p>}

        {!carregando && !erro && noticias.length === 0 && (
          <p>Nenhuma notícia cadastrada.</p>
        )}

        {(noticias || []).slice(0, 4).map((noticia) => (
          <div className="card-ul-noticia" key={noticia.idNoticias}>
            <img src={noticia.imagem} alt={noticia.titulo} />

            <div className="card-info-Ul-noticias">
              <p className="categoria">{noticia.categoria}</p>

              <div className="txt-noticia">{noticia.titulo}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
