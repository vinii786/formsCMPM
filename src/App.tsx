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
import DeclaracaoDependentes from "./pages/DeclaracaoDependentes/DeclaracaoDependentes";
import DeclaracaoNaoOcupacao from "./pages/DeclaracaoNaoOcupacao/DeclaracaoNaoOcupacao";
import DeclaracaoNepotismo from "./pages/DeclaracaoNepotismo/DeclaracaoNepotismo";
import DeclaracaoFichaLimpa from "./pages/DeclaracaoFichaLimpa/DeclaracaoFichaLimpa";
import SolicitacaoDiaria from "./pages/SolicitacaoDiaria/SolicitacaoDiaria";

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
          <Route path="/adiantamento-13" element={<Adiantamento13 />} />
          <Route path="/declaracao-dependentes" element={<DeclaracaoDependentes />} />
          <Route path="/declaracao-ficha-limpa"element={<DeclaracaoFichaLimpa />}/>
          <Route path="/declaracao-nepotismo" element={<DeclaracaoNepotismo />} />
          <Route path="/declaracao-nao-ocupacao" element={<DeclaracaoNaoOcupacao />}/>
          <Route path="/ocorrencia-ponto" element={<OcorrenciaPonto />} />
          <Route path="/relatorio-viagem" element={<RelatorioViagem />} />
          <Route path="/formulario-ferias" element={<FormularioFerias />} />
          <Route path="/solicitacao-cursos" element={<SolicitacaoCursos />} />
          <Route path="/SolicitacaoDiaria" element={<SolicitacaoDiaria />} />
          <Route path="/solicitacao-viagem" element={<SolicitacaoViagem />} /> 
          {/* NAO ESTA EM USO  */}
          <Route path="/solicitacao-documentos"element={<SolicitacaoDocumentos />}/>
          <Route path="/solicitacao-estagiario"element={<SolicitacaoEstagiario />}/>
        
        </Routes>
      </main>
    </div>
  );
}

export default App;
