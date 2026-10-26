import "./header.css";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid" style={{ padding: "0 40px" }}>
          <Link className="navbar-brand" href="#">
            <img src="/imagens/logo.png" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ gap: "20px" }}
            >
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
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
                    <Link className="dropdown-item" href="#">
                      Vôlei
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
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Perquisar notícia ..."
                aria-label="Search"
                style={{ width: "50vw" }}
              />
              <button className="btn btn-danger" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
