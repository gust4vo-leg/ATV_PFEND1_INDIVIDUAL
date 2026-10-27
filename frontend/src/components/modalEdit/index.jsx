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

  useEffect(() => {
    if (!noticia) return;

    setTitulo(noticia.titulo || "");
    setDescricao(noticia.descricao || "");
    setCategoria(noticia.categoria || "");
    setConteudo(noticia.conteudo || "");

    if (noticia.data_publicacao) {
      const data = new Date(noticia.data_publicacao);
      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const dia = String(data.getDate()).padStart(2, "0");

      setDataPublicacao(`${ano}-${mes}-${dia}`);
    } else {
      setDataPublicacao("");
    }

    setImagem(null);
  }, [noticia]);

  async function salvarEdicao(event) {
    event.preventDefault();

    if (!noticia?.idNoticias || salvando) return;

    try {
      setSalvando(true);

      const formulario = new FormData();

      formulario.append("titulo", titulo);
      formulario.append("descricao", descricao);
      formulario.append("categoria", categoria);
      formulario.append("conteudo", conteudo);
      formulario.append("data_publicacao", dataPublicacao);

      if (imagem) {
        formulario.append("imagem", imagem);
      }

      const resposta = await fetch(
        `http://localhost:3005/api/noticias/${noticia.idNoticias}`,
        {
          method: "PUT",
          body: formulario,
        },
      );

      if (!resposta.ok) {
        throw new Error("Não foi possível editar a notícia.");
      }

      alert("Notícia atualizada com sucesso!");
      onFechar();
      window.location.reload();
    } catch (erro) {
      console.error("Erro ao editar notícia:", erro);
      alert(erro.message || "Ocorreu um erro ao editar a notícia.");
    } finally {
      setSalvando(false);
    }
  }

  if (!noticia) return null;

  return (
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
              list="categorias-esportivas"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
              autoComplete="off"
              placeholder="Digite ou selecione um esporte..."
              required
            />

            <datalist id="categorias-esportivas">
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
                onChange={(event) => setImagem(event.target.files?.[0] || null)}
              />
            </div>

            <small className="text-secondary">
              Se não selecionar outra imagem, a imagem atual será mantida, desde
              que sua API implemente esse comportamento.
            </small>
          </div>

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
              <i className="bi bi-check-lg"></i>
              {salvando ? "Salvando..." : "Editar Notícia"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
