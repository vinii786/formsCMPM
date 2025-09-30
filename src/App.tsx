import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePages";
import FormularioFerias from "./pages/FormularioFerias/FormularioFerias";
import OcorrenciaPonto from "./pages/OcorrenciaPonto/OcorrenciaPonto";
import SolicitacaoEstagiario from "./pages/SolicitacaoEstagiario/SolicitacaoEstagiario";
import SolicitacaoCursos from "./pages/SolicitacaoCursos/SolicitacaoCursos";
import SolicitacaoViagem from "./pages/SolicitacaoViagem/SolicitacaoViagem";
import Adiantamento13 from "./pages/Adiantamento13/Adiantamento13";
import RelatorioViagem from "./pages/RelatorioViagem/RelatorioViagem";
import SolicitacaoDocumentos from "./pages/SolicitacaoDocumentos/SolicitacaoDocumentos";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <Link
          to="/"
          className="header-link"
          style={{ textDecoration: "none", color: "rgb(0, 86, 179)" }}
        >
          <h1>Câmara Municipal de Patos de Minas</h1>
        </Link>
      </header>

      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/formulario-ferias" element={<FormularioFerias />} />
          <Route path="/ocorrencia-ponto" element={<OcorrenciaPonto />} />
          <Route
            path="/solicitacao-estagiario"
            element={<SolicitacaoEstagiario />}
          />
          <Route path="/solicitacao-cursos" element={<SolicitacaoCursos />} />
          <Route path="/solicitacao-viagem" element={<SolicitacaoViagem />} />
          <Route path="/adiantamento-13" element={<Adiantamento13 />} />
          <Route path="/relatorio-viagem" element={<RelatorioViagem />} />
          <Route
            path="/solicitacao-documentos"
            element={<SolicitacaoDocumentos />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
