"use client";

import { useState } from "react";
import "./formAdd.css";

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

const formularioInicial = {
  titulo: "",
  descricao: "",
  categoria: "",
  conteudo: "",
  data_publicacao: "",
  imagem: "",
};

export default function FormAdd() {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState({
    tipo: "",
    texto: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    if (mensagem.texto) {
      setMensagem({ tipo: "", texto: "" });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMensagem({ tipo: "", texto: "" });

    const { titulo, categoria, descricao, conteudo, data_publicacao, imagem } =
      formulario;

    if (
      !titulo.trim() ||
      !categoria.trim() ||
      !descricao.trim() ||
      !conteudo.trim() ||
      !data_publicacao ||
      !(imagem instanceof File)
    ) {
      setMensagem({
        tipo: "erro",
        texto: "Preencha todos os campos e selecione uma imagem.",
      });
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(imagem.type)) {
      setMensagem({
        tipo: "erro",
        texto: "Selecione uma imagem JPG, PNG ou WEBP.",
      });
      return;
    }

    if (imagem.size > 5 * 1024 * 1024) {
      setMensagem({
        tipo: "erro",
        texto: "A imagem deve ter no máximo 5 MB.",
      });
      return;
    }

    const dados = new FormData();

    dados.append("titulo", titulo.trim());
    dados.append("categoria", categoria.trim());
    dados.append("descricao", descricao.trim());
    dados.append("conteudo", conteudo.trim());
    dados.append("data_publicacao", data_publicacao);
    dados.append("imagem", imagem);

    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:3005/api/noticias", {
        method: "POST",
        body: dados,
      });

      const resultado = await resposta.json().catch(() => null);

      if (!resposta.ok) {
        throw new Error(
          resultado?.mensagem ||
            resultado?.message ||
            resultado?.error ||
            "Não foi possível cadastrar a notícia.",
        );
      }

      setFormulario(formularioInicial);
      event.target.reset();

      setMensagem({
        tipo: "sucesso",
        texto: resultado?.mensagem || "Notícia publicada com sucesso!",
      });
    } catch (erro) {
      console.error("Erro ao publicar notícia:", erro);

      setMensagem({
        tipo: "erro",
        texto:
          erro.message ||
          "Erro ao conectar com o servidor. Verifique se o backend está funcionando.",
      });
    } finally {
      setCarregando(false);
    }
  }

  function limparFormulario() {
    setFormulario(formularioInicial);
    setMensagem({ tipo: "", texto: "" });
  }

  return (
    <div className="formulario-add">
      <div className="top-from">Informações da Notícia</div>

      <form onSubmit={handleSubmit} onReset={limparFormulario}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={formulario.titulo}
            onChange={handleChange}
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
            value={formulario.descricao}
            onChange={handleChange}
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
            list="categorias-esportivas"
            value={formulario.categoria}
            onChange={handleChange}
            maxLength={255}
            autoComplete="off"
            placeholder="Digite ou selecione um esporte..."
            required
          />

          <datalist id="categorias-esportivas">
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria} />
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
            value={formulario.conteudo}
            onChange={handleChange}
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
              value={formulario.data_publicacao}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="campo-modal">
          <label htmlFor="imagem" className="form-label">
            Imagem da Notícia
            <span className="text-danger"> *</span>
          </label>

          <div className="upload-imagem">
            <i className="bi bi-image"></i>
            <span>Selecionar imagem</span>

            <input
              type="file"
              className="form-control"
              id="imagem"
              name="imagem"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => {
                const arquivo = event.target.files?.[0];

                setFormulario((anterior) => ({
                  ...anterior,
                  imagem: arquivo || "",
                }));
              }}
              required
            />
          </div>
        </div>

        {mensagem.texto && (
          <div
            className={`alert ${
              mensagem.tipo === "sucesso" ? "alert-success" : "alert-danger"
            }`}
            role="status"
          >
            {mensagem.texto}
          </div>
        )}

        <div className="acoes-modal">
          <button type="reset" className="btn-cancelar" disabled={carregando}>
            Limpar formulário
          </button>

          <button type="submit" className="btn-salvar" disabled={carregando}>
            <i className="bi bi-check-lg"></i>{" "}
            {carregando ? "Publicando..." : "Publicar Notícia"}
          </button>
        </div>
      </form>
    </div>
  );
}
