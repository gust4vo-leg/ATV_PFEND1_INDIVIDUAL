"use client";

import { useEffect, useState } from "react";
import FormAdd from "@/components/formAdd";
import CardAdmin from "@/components/cardAdmin";
import "./add.css";

export default function AddNoticias() {
  const [noticiasAdmin, setNoticiasAdmin] = useState([]);
  const [carregandoAdmin, setCarregandoAdmin] = useState(true);
  const [erroAdmin, setErroAdmin] = useState("");

  useEffect(() => {
    async function buscarNoticias() {
      try {
        setCarregandoAdmin(true);
        setErroAdmin("");

        const resposta = await fetch("http://localhost:3005/api/noticias");

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar as notícias.");
        }

        const dados = await resposta.json();
        setNoticiasAdmin(dados);
      } catch (erro) {
        setErroAdmin(erro.message);
      } finally {
        setCarregandoAdmin(false);
      }
    }

    buscarNoticias();
  }, []);

  return (
    <main id="addNoticias">
      <div className="top-noticias-admin">
        <div className="top-left-admin">
          <h3>Adicionar Notícia</h3>
          <p>Preencha os dados abaixo para publicar uma nova notícia no site</p>
        </div>
      </div>

      <div className="container-add">
        <div className="form-add">
          <FormAdd />
        </div>
        <div className="container-table-gerenciador-admin">
          {carregandoAdmin ? (
            <p>Carregando notícias...</p>
          ) : erroAdmin ? (
            <p>{erroAdmin}</p>
          ) : noticiasAdmin.length === 0 ? (
            <p>Nenhuma notícia cadastrada.</p>
          ) : (
            <CardAdmin noticiasAdmin={noticiasAdmin} />
          )}
        </div>
      </div>
    </main>
  );
}
