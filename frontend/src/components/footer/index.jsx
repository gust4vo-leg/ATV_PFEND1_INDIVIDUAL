"use client";

import Link from "next/link";
import "./footer.css";
import { useEffect, useState } from "react";

export default function Footer() {
  const [cardFooter, setCardFooter] = useState([]);
  const [erro, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3005/api/noticias")
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Não foi possivél carregar as notícias");
        }
        return resposta.json();
      })
      .then((dados) => {
        setCardFooter(dados);
      })
      .catch((erro) => {
        setError(erro.message);
      });
  }, []);

  return (
    <footer>
      <div className="footer-left">
        <img src="/imagens/logo.png" />
        <span>
          A CronoSport é o seu portal de notícias esportivas, trazendo as
          principais informações, análises e novidades do mundo do esporte, em
          um só lugar
        </span>
        <div className="app-grid">
          <i className="bi bi-instagram"></i>
          <i className="bi bi-twitter-x"></i>
          <i className="bi bi-youtube"></i>
          <i className="bi bi-facebook"></i>
          <i className="bi bi-tiktok"></i>
        </div>
      </div>
      <div className="footer-main">
        <div className="top-footer-main-left">
          <h4>NAVEGAÇÃO</h4>

          <nav>
            <ul>
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>
                <Link href="/ultimasNoticias"> Notícias</Link>
              </li>
              <li className="dorpdown">
                <Link
                  className="nav-link active dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Esportes
                </Link>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" href="#">
                      Futebol
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Basquete
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Fórmula 1
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Futebol Americano
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Outros esportes
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="top-footer-main-right">
          <h4>ESPORTE EM DESTAQUE</h4>

          <div className="grid-destaque-footer">
            {cardFooter.slice(0, 3).map((noticia) => (
              <div className="card-ul-noticia-footer" key={noticia.idNoticia}>
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
                  className="imagem-admin"
                  onError={(event) => {
                    console.error(
                      "Não foi possível carregar a imagem:",
                      event.currentTarget.src,
                    );
                  }}
                />
                <div className="card-info-Ul-noticias-footer">
                  <p className="categoria-footer">{noticia.categoria}</p>
                  <div className="txt-noticia-footer">{noticia.titulo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-right">
        <div className="top-footer-right">
          <h4>RECEBA NOVIDADES</h4>
        </div>
        <span>
          Cadastre-se para receber as principais notícias esportivas no seu
          e-mail.
        </span>
        <div className="inscrever">
          <form>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              name="novidades"
            />
            <button type="submit">
              <i className="bi bi-send-fill"></i>
              <p>Inscrever</p>
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © 2026 <strong>CronoSport</strong>. Todos os direitos reservados
        </span>
      </div>
    </footer>
  );
}
