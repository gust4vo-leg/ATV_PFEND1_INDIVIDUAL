import Link from "next/link";
import './kpiDestaque.css';

export default function Kpi() {
  return (
    <>
      <div className="kpi-cards">
        <Link href="#">
          <img src="/imagens/kpiFutebol.jpg" alt="" />
          <p>FUTEBOL</p>
        </Link>
      </div>
      <div className="kpi-cards">
        <Link href="#">
          <img src="/imagens/kpiBasquete.jpg" alt="" />
          <p>BASQUETE</p>
        </Link>
      </div>
      <div className="kpi-cards">
        <Link href="#">
          <img src="/imagens/kpiFormula.jpg" alt="" />
          <p>FÓRMULA 1</p>
        </Link>
      </div>
      <div className="kpi-cards">
        <Link href="#">
        <img src="/imagens/kpiAmericano.jpg" alt="" /></Link>
        <p>FUTEBOL AMERICANO</p>
      </div>
      <div className="kpi-cards">
        <Link href="#">
          <img src="/imagens/kpiVolei.jpg" alt="" />
          <p>VÔLEI</p>
        </Link>
      </div>
      <div className="kpi-cards">
        <Link href="#">
          <img src="/imagens/kpiOutros.jpg" alt="" />
          <p>OUTROS</p>
        </Link>
      </div>
    </>
  );
}
