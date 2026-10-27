import "./header.css";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid" style={{ padding: "0 40px" }}>
          <Link className="navbar-brand" href="/">
            <img src="/imagens/logo.png" alt="CronSport" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Abrir menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ gap: "20px" }}
            >
              <li className="nav-item">
                <Link className="nav-link active" href="/">
                  Início
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" href="/ultimasNoticias">
                  Notícias
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" href="/adminNoticias">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link active dropdown-toggle"
                  href="/ultimasNoticias"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Esportes
                </Link>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/ultimasNoticias?categoria=Futebol"
                    >
                      Futebol
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      href="/ultimasNoticias?categoria=Basquete"
                    >
                      Basquete
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      href="/ultimasNoticias?categoria=Fórmula%201"
                    >
                      Fórmula 1
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      href="/ultimasNoticias?categoria=Futebol%20Americano"
                    >
                      Futebol Americano
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      href="/ultimasNoticias?categoria=Vôlei"
                    >
                      Vôlei
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      href="/ultimasNoticias?categoria=Outros"
                    >
                      Outros esportes
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
