"use client";

import { useEffect, useState } from "react";
import CardAdmin from "@/components/cardAdmin";
import Link from "next/link";

export default function Admin() {
  const [noticiaAdmin, setNoticiaAdmin] = useState([]);
  const [erroAdmin, setErroAdmin] = useState("");
  const [carregandoAdmin, setCarregandoAdmin] = useState(true);
  const [categoriaSelecionadaAdmin, setCategoriaSelecionadaAdmin] =
    useState("Todas");

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
    setCarregandoAdmin(true);
    setErroAdmin("");

    const url =
      categoriaSelecionadaAdmin === "Todas"
        ? "http://localhost:3005/api/noticias"
        : `http://localhost:3005/api/noticias?categoria=${encodeURIComponent(
            categoriaSelecionadaAdmin,
          )}`;

    fetch(url)
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar as notícias.");
        }

        return resposta.json();
      })
      .then((dados) => {
        setNoticiaAdmin(dados);
      })
      .catch((error) => {
        setErroAdmin(error.message);
      })
      .finally(() => {
        setCarregandoAdmin(false);
      });
  }, [categoriaSelecionadaAdmin]);

  return (
    <main id="gerenciador">
      <div className="top-noticias-admin">
        <div className="top-left-admin">
          <h3>Gerenciar Notícias</h3>
          <p>Visualize, edite ou exclua notícias publicadas no site.</p>
        </div>

        <div className="btn-adicionar">
          <Link href="/adminNoticias/adicionar">
            <i className="bi bi-plus-lg"></i>
            <span>Adicionar Notícia</span>
          </Link>
        </div>
      </div>

      <div className="filtro">
        <nav className="filtro-ultimas">
          <ul>
            {categorias.map((categoria) => (
              <li
                key={categoria}
                className={
                  categoriaSelecionadaAdmin === categoria ? "active" : ""
                }
                onClick={() => setCategoriaSelecionadaAdmin(categoria)}
              >
                {categoria}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="conteudo-noticia">
        <div className="container-table-gerenciador-admin">
          {carregandoAdmin ? (
            <p>Carregando notícias...</p>
          ) : erroAdmin ? (
            <p>{erroAdmin}</p>
          ) : noticiaAdmin.length === 0 ? (
            <p style={{ color: "#fff", margin: "10px" }}>
              Nenhuma notícia cadastrada.
            </p>
          ) : (
            <CardAdmin noticiasAdmin={noticiaAdmin} />
          )}
        </div>

        <div className="cards-estatisticas">
          <div className="estatistica">
            <div className="top-estatistica">
              <i className="bi bi-exclamation-circle"></i>
              <p>Estatísticas</p>
            </div>

            <div className="conteudo-estatistica">
              <i class="bi bi-file-earmark-text"></i>
              <div className="right-noticia">
                <p>Total de notícias</p>
                <h3>{noticiaAdmin.length}</h3>
              </div>
            </div>
          </div>

          <div className="ultimasNoticiasAdmin">
            <div className="top-ul-noticia-admin">
              <i class="bi bi-exclamation-circle"></i>
              <p>Últimas atualizações</p>
            </div>

            {noticiaAdmin.slice(0, 3).map((noticia) => (
              <div className="conteudo-ul-noticia" key={noticia.idNoticia}>
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

                <div className="txt">
                  <div className="titulo">{noticia.titulo}</div>
                  <div className="data">
                    {new Date(noticia.data_publicacao).toLocaleDateString(
                      "pt-BR",
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </main>
  );
}
