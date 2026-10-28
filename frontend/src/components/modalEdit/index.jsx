"use client";

import { useEffect, useState } from "react";
import "./modal.css";

const categorias = [
  "Futebol",
  "Basquete",
  "Vôlei",
  "Tênis",
  "Fórmula 1",
  "MMA",
  "Boxe",
  "Natação",
  "Atletismo",
  "Handebol",
  "Rugby",
  "Ciclismo",
  "Surfe",
  "Skate",
  "Tênis de mesa",
  "eSports",
];

export default function ModalEdit({ noticia, onFechar }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [imagem, setImagem] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!noticia) return;

    setTitulo(noticia.titulo || "");
    setDescricao(noticia.descricao || "");
    setCategoria(noticia.categoria || "");
    setConteudo(noticia.conteudo || "");

    setDataPublicacao(
      noticia.data_publicacao
        ? String(noticia.data_publicacao).slice(0, 10)
        : "",
    );

    setImagem(null);
    setMensagem("");
  }, [noticia]);

  async function salvarEdicao(event) {
    event.preventDefault();

    if (!noticia?.idNoticias || salvando) return;

    if (
      !titulo.trim() ||
      !descricao.trim() ||
      !categoria.trim() ||
      !conteudo.trim() ||
      !dataPublicacao
    ) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    if (imagem) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(imagem.type)) {
        setMensagem("Selecione uma imagem JPG, PNG ou WEBP.");
        return;
      }

      if (imagem.size > 5 * 1024 * 1024) {
        setMensagem("A imagem deve ter no máximo 5 MB.");
        return;
      }
    }

    const formulario = new FormData();

    formulario.append("titulo", titulo.trim());
    formulario.append("descricao", descricao.trim());
    formulario.append("categoria", categoria.trim());
    formulario.append("conteudo", conteudo.trim());
    formulario.append("data_publicacao", dataPublicacao);

    // Só envia a imagem quando uma nova for selecionada.
    if (imagem) {
      formulario.append("imagem", imagem);
    }

    try {
      setSalvando(true);
      setMensagem("");

      const resposta = await fetch(
        `http://localhost:3005/api/noticias/${noticia.idNoticias}`,
        {
          method: "PUT",
          body: formulario,
        },
      );

      const resultado = await resposta.json().catch(() => null);

      if (!resposta.ok) {
        throw new Error(
          resultado?.mensagem ||
            resultado?.message ||
            resultado?.error ||
            "Não foi possível editar a notícia.",
        );
      }

      alert(resultado?.mensagem || "Notícia atualizada com sucesso!");

      onFechar();
      window.location.reload();
    } catch (erro) {
      console.error("Erro ao editar notícia:", erro);
      setMensagem(erro.message || "Erro ao conectar com o servidor.");
    } finally {
      setSalvando(false);
    }
  }

  if (!noticia) return null;

  return (
    <main id="modal">
      <div className="modal-overlay">
        <div
          className="modal-editar-noticia"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-modal-editar"
        >
          <div className="top-form">
            <span id="titulo-modal-editar">Editar Notícia</span>

            <button
              type="button"
              className="btn-fechar-modal"
              onClick={onFechar}
              aria-label="Fechar modal"
              disabled={salvando}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <form onSubmit={salvarEdicao}>
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">
                Título <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                className="form-control"
                id="titulo"
                value={titulo}
                onChange={(event) => setTitulo(event.target.value)}
                maxLength={500}
                placeholder="Digite o título da notícia..."
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">
                Descrição <span className="text-danger">*</span>
              </label>

              <textarea
                className="form-control"
                id="descricao"
                name="descricao"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
                maxLength={500}
                rows={3}
                placeholder="Escreva uma breve descrição..."
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">
                Categoria <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                className="form-control"
                id="categoria"
                name="categoria"
                list="categorias-esportivas-editar"
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}
                maxLength={255}
                autoComplete="off"
                placeholder="Digite ou selecione um esporte..."
                required
              />

              <datalist id="categorias-esportivas-editar">
                {categorias.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>

              <small className="text-secondary">
                Escolha uma sugestão ou digite outro esporte.
              </small>
            </div>

            <div className="mb-3">
              <label htmlFor="conteudo" className="form-label">
                Conteúdo <span className="text-danger">*</span>
              </label>

              <textarea
                className="form-control"
                id="conteudo"
                name="conteudo"
                value={conteudo}
                onChange={(event) => setConteudo(event.target.value)}
                rows={7}
                placeholder="Digite ou cole o texto completo da reportagem..."
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="data_publicacao" className="form-label">
                Data de Publicação <span className="text-danger">*</span>
              </label>

              <div className="input-icon">
                <input
                  type="date"
                  id="data_publicacao"
                  name="data_publicacao"
                  value={dataPublicacao}
                  onChange={(event) => setDataPublicacao(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="campo-modal">
              <label htmlFor="imagem" className="form-label">
                Imagem da Notícia
              </label>

              <div className="upload-imagem">
                <i className="bi bi-image"></i>

                <span>
                  {imagem ? imagem.name : "Selecionar nova imagem (opcional)"}
                </span>

                <input
                  type="file"
                  className="form-control"
                  id="imagem"
                  name="imagem"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) =>
                    setImagem(event.target.files?.[0] || null)
                  }
                />
              </div>

              <small className="text-secondary">
                Se não selecionar outra imagem, a imagem atual será mantida.
              </small>
            </div>

            {mensagem && (
              <div className="alert alert-danger mt-3" role="alert">
                {mensagem}
              </div>
            )}

            <div className="acoes-modal">
              <button
                type="button"
                className="btn-cancelar"
                onClick={onFechar}
                disabled={salvando}
              >
                Cancelar
              </button>

              <button type="submit" className="btn-salvar" disabled={salvando}>
                <i className="bi bi-check-lg"></i>{" "}
                {salvando ? "Salvando..." : "Editar Notícia"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
