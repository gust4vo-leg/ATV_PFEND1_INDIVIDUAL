import "./login.css";

export default function Login() {
  return (
    <section id="login">
      <div className="login-container">
        <h1>Acesso Administrativo</h1>

        <p className="login-descricao">
          Faça login para acessar o painel de gerenciamento de notícias da
          CronoSport.
        </p>

        <form>
          <div className="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              E-mail 
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-3">
            <label for="inputPassword5" class="form-label">
              Password
            </label>
            <input
              type="password"
              id="inputPassword5"
              class="form-control"
              placeholder="Digite sua senha"
              aria-describedby="passwordHelpBlock"
              required
            />
          </div>

          <button type="submit" className="login-botao">
            Entrar no painel
          </button>
        </form>

        <a href="/" className="login-voltar">
          ← Voltar para o site
        </a>
      </div>
    </section>
  );
}
