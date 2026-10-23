"use client";

import Hero from "@/components/hero";
import "./globals.css";
import Kpi from "@/components/kpiDestaque";
import Destaque from "@/components/destaqueNoticias";

export default function Home() {
  return (
    <>
      <main>
        <div className="container-hero">
          <Hero />
        </div>
        <section id="noticias-destaques">
          <div className="destaque-container">
            <div className="top-destaque">
              <h3>DESTAQUES</h3>
            </div>
            <div className="container-cards">
              <Destaque />
            </div>
          </div>
        </section>
        <section id="kpis-esportes">
          <div className="kpis-container">
            <div className="top-kpis">
              <h3>ESPORTES EM DESTAQUES</h3>
            </div>

            <div className="grid-kpi">
              <Kpi />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
