import Link from "next/link";
import "./kpiDestaque.css";

export default function Kpi() {
  return (
    <>
      <div className="kpi-cards">
        <Link href="/ultimasNoticias?categoria=Futebol">
          <img src="/imagens/kpiFutebol.jpg" alt="" />
          <p>FUTEBOL</p>
        </Link>
      </div>

      <div className="kpi-cards">
        <Link href="/ultimasNoticias?categoria=Basquete">
          <img src="/imagens/kpiBasquete.jpg" alt="" />
          <p>BASQUETE</p>
        </Link>
      </div>

      <div className="kpi-cards">
        <Link href="/ultimasNoticias?categoria=Fórmula 1">
          <img src="/imagens/kpiFormula.jpg" alt="" />
          <p>FÓRMULA 1</p>
        </Link>
      </div>

      <div className="kpi-cards">
        <Link href="/ultimasNoticias?categoria=Futebol Americano">
          <img src="/imagens/kpiAmericano.jpg" alt="" />
          <p>FUTEBOL AMERICANO</p>
        </Link>
      </div>

      <div className="kpi-cards">
        <Link href="/ultimasNoticias?categoria=Vôlei">
          <img src="/imagens/kpiVolei.jpg" alt="" />
          <p>VÔLEI</p>
        </Link>
      </div>

      <div className="kpi-cards">
        <Link href="/ultimasNoticias?categoria=Outros">
          <img src="/imagens/kpiOutros.jpg" alt="" />
          <p>OUTROS</p>
        </Link>
      </div>
    </>
  );
}
