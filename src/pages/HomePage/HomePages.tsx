// src/pages/HomePage/HomePage.tsx
import FormCard from "../../components/FormCard";
import "./HomePage.css";
import {
  FaPlaneDeparture,
  FaClock,
  FaUserGraduate,
  FaBook,
  FaSuitcaseRolling,
  FaFileAlt,
  FaMoneyBillWave,
  FaReceipt,
  FaUserCheck,
  FaUserShield,
} from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* O cabeçalho foi REMOVIDO daqui */}
      <div className="card-container">
        <FormCard
          title="Requerimento de Férias"
          description="Solicite as suas férias regulamentares."
          linkTo="/formulario-ferias"
          icon={<FaPlaneDeparture />}
        />
        <FormCard
          title="Ocorrência de Ponto"
          description="Justifique ausências, atrasos ou esquecimentos de marcação."
          linkTo="/ocorrencia-ponto"
          icon={<FaClock />}
        />
        <FormCard
          title="Solicitação de Estagiário"
          description="Formulário para solicitar a contratação de estagiários."
          linkTo="/solicitacao-estagiario"
          icon={<FaUserGraduate />}
        />
        <FormCard
          title="Solicitação de Cursos"
          description="Apoio a iniciativas de capacitação de curta e média duração."
          linkTo="/solicitacao-cursos"
          icon={<FaBook />}
        />
        <FormCard
          title="Solicitação de Viagem"
          description="Formulário para solicitar autorização para viagens."
          linkTo="/solicitacao-viagem"
          icon={<FaSuitcaseRolling />}
        />
        <FormCard
          title="Relatório de Viagem"
          description="Formulário para prestação de contas de viagens."
          linkTo="/relatorio-viagem"
          icon={<FaReceipt />}
        />
        <FormCard
          title="Solicitação de Documentos"
          description="Requerimento de cópia de documentos da pasta funcional."
          linkTo="/solicitacao-documentos"
          icon={<FaFileAlt />}
        />
        <FormCard
          title="Antecipação 13º Salário"
          description="Requerimento da antecipação da primeira parcela do 13º salário."
          linkTo="/adiantamento-13"
          icon={<FaMoneyBillWave />}
        />
        <FormCard
          title="Declaração de Dependentes"
          description="Formulário para declaração de dependentes para fins de imposto de renda."
          linkTo="/declaracao-dependentes"
          icon={<FaUserGraduate />}
        />
        <FormCard
          title="Não Ocupação de Cargos"
          description="Declaração quanto a ocupação de cargos públicos."
          linkTo="/declaracao-nao-ocupacao"
          icon={<FaFileAlt />} // Exemplo de ícone, pode trocar
        />
        <FormCard
          title="Declaração de Nepotismo"
          description="Declaração sobre inexistência de nepotismo (LC 274 e Súmula 13 STF)."
          linkTo="/declaracao-nepotismo"
          icon={<FaUserCheck />}
        />
        <FormCard
          title="Declaração Ficha Limpa"
          description="Declaração para fins de provimento em cargo comissionado (LC 356/2011)."
          linkTo="/declaracao-ficha-limpa"
          icon={<FaUserShield />}
        />
      </div>
    </div>
  );
};

export default HomePage;
