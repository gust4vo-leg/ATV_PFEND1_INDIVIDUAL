"use client";

import { useEffect, useState } from "react";
import "./cardAdmin.css";

const NOTICIAS_POR_PAGINA = 7;

export default function CardAdmin({ noticiasAdmin = [] }) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = Math.ceil(noticiasAdmin.length / NOTICIAS_POR_PAGINA);
  const indiceInicial = (paginaAtual - 1) * NOTICIAS_POR_PAGINA;
  const noticiasPaginadas = noticiasAdmin.slice(
    indiceInicial,
    indiceInicial + NOTICIAS_POR_PAGINA,
  );

  useEffect(() => {
    setPaginaAtual((pagina) => Math.min(pagina, Math.max(1, totalPaginas)));
  }, [totalPaginas]);

  function mudarPagina(novaPagina) {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
  }

  function excluirNoticia(idNoticias) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta notícia?",
    );

    if (!confirmar) {
      return;
    }

    fetch(`http://localhost:3005/api/noticias/${idNoticias}`, {
      method: "DELETE",
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Não foi possível excluir a notícia.");
        }

        return resposta.json();
      })
      .then((dados) => {
        alert(dados.mensagem);
        window.location.reload();
      })
      .catch((erro) => {
        console.error("Erro ao excluir notícia:", erro);
        alert(erro.message);
      });
  }

  return (
    <div className="gerenciar-tabela-container">
      <div className="table-responsive">
        <table className="table gerenciar-tabela align-middle">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Título</th>
              <th>Categoria</th>
              <th>Data</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {noticiasPaginadas.length === 0 ? (
              <tr>
                <td colSpan={5} className="gerenciar-vazio">
                  Nenhuma notícia cadastrada.
                </td>
              </tr>
            ) : (
              noticiasPaginadas.map((noticia) => (
                <tr key={noticia.idNoticias}>
                  <td>
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
                  </td>

                  <td className="titulo-admin">{noticia.titulo}</td>

                  <td>{noticia.categoria}</td>

                  <td>
                    {noticia.data_publicacao
                      ? new Date(noticia.data_publicacao).toLocaleDateString(
                          "pt-BR",
                        )
                      : "Sem data"}
                  </td>

                  <td className="text-center">
                    <div className="acoes-admin">
                      <button
                        type="button"
                        className="btn-editar-admin"
                        title="Editar notícia"
                        onClick={() =>
                          (window.location.href = `/adminNoticias/editar/${noticia.idNoticias}`)
                        }
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        type="button"
                        className="btn-excluir-admin"
                        title="Excluir notícia"
                        onClick={() => excluirNoticia(noticia.idNoticias)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <footer className="gerenciar-tabela-rodape">
        <span>
          {noticiasAdmin.length === 0
            ? "Nenhuma notícia"
            : `Mostrando ${indiceInicial + 1}–${Math.min(
                indiceInicial + NOTICIAS_POR_PAGINA,
                noticiasAdmin.length,
              )} de ${noticiasAdmin.length} notícias`}
        </span>

        {totalPaginas > 1 && (
          <nav className="paginacao-admin" aria-label="Paginação de notícias">
            <button
              type="button"
              className="pagina-btn"
              onClick={() => mudarPagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
              aria-label="Página anterior"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
              (pagina) => (
                <button
                  key={pagina}
                  type="button"
                  className={`pagina-btn ${
                    paginaAtual === pagina ? "pagina-ativa" : ""
                  }`}
                  onClick={() => mudarPagina(pagina)}
                  aria-current={paginaAtual === pagina ? "page" : undefined}
                >
                  {pagina}
                </button>
              ),
            )}

            <button
              type="button"
              className="pagina-btn"
              onClick={() => mudarPagina(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
              aria-label="Próxima página"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </nav>
        )}
      </footer>
    </div>
  );
}
