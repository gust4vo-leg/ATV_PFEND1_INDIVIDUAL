import Link from "next/link";
import "./cardUltimas.css";

export default function CardUltimasNoticias({ UltimasNoticias = [] }) {
  return (
    <section className="ultimas-noticias">
      <div className="ultimas-container">
        <div className="ultimas-grid">
          {UltimasNoticias.map((noticia, index) => (
            <article className="ultimas-card" key={noticia.idNoticias || index}>
              <Link
                href={`/ultimasNoticias/${noticia.idNoticias}`}
                className="ultimas-card-link"
              >
                <div className="ultimas-imagem-container">
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
                    className="ultimas-imagem"
                    onError={(event) => {
                      console.error(
                        "Não foi possível carregar a imagem:",
                        event.currentTarget.src,
                      );
                    }}
                  />
                  <span className="ultimas-categoria">{noticia.categoria}</span>
                </div>

                <div className="ultimas-card-conteudo">
                  <h3 className="ultimas-card-titulo">{noticia.titulo}</h3>
                  <p className="ultimas-card-descricao">{noticia.descricao}</p>

                  <div className="ultimas-card-rodape">
                    <span className="ultimas-data">
                      <p>
                        {new Date(noticia.data_publicacao).toLocaleDateString(
                          "pt-BR",
                        )}
                      </p>
                    </span>

                    <Link
                      href={`/ultimasNoticias/${noticia.idNoticias}`}
                      className="ultimas-ler"
                    >
                      Ler notícia <i className="bi bi-arrow-up-right"></i>
                    </Link>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
