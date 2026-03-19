// src/pages/SolicitacaoCursos/SolicitacaoCursos.tsx
import React, { useState, useEffect } from "react";
import "../FormularioFerias/FormularioFerias.css";
import FormServidor from "./components/FormServidor";
import FormSuperior from "./components/FormSuperiorImediato";
import FormDiretorGeral from "./components/FormDiretorGeral";

export interface FormData {
  nome: string;
  endereco: string;
  celular: string;
  identidade: string;
  matricula: string;
  lotacao: string;
  emailServidor: string;
  cpf: string;
  cargo: string;
  ramal: string;
  funcaoConfianca: "sim" | "nao";
  tipoFuncao: "direcao" | "gratificada" | "nenhum";
  qualFuncao: string;
  descricaoCurso: string;
  fornecedor: string;
  cnpj: string;
  contato: string;
  whatsapp: string;
  emailFornecedor: string;
  periodoRealizacao: string;
  inicioTermino: string;
  cargaHorariaTotal: string;
  cargaHorariaDiaria: string;
  usoProgressao: "sim" | "nao";
  formaApresentacao: string;
  solicitaInscricao: "sim" | "nao";
  valorInscricao: string;
  solicitaMensalidade: "sim" | "nao";
  valorMensalidade: string;
  valorTotal: string;
  // NOVOS CAMPOS PARA OS PARECERES
  parecerSuperior: string;
  decisaoSuperior: "deferido" | "indeferido" | "";
  dataSuperior: string;
  parecerDiretor: string;
  decisaoDiretor: "deferido" | "indeferido" | "";
  dataDiretor: string;
}

const SolicitacaoCursos = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    endereco: "",
    celular: "",
    identidade: "",
    matricula: "",
    lotacao: "",
    emailServidor: "",
    cpf: "",
    cargo: "",
    ramal: "",
    funcaoConfianca: "nao",
    tipoFuncao: "nenhum",
    qualFuncao: "",
    descricaoCurso: "",
    fornecedor: "",
    cnpj: "",
    contato: "",
    whatsapp: "",
    emailFornecedor: "",
    periodoRealizacao: "",
    inicioTermino: "",
    cargaHorariaTotal: "",
    cargaHorariaDiaria: "",
    usoProgressao: "nao",
    formaApresentacao: "",
    solicitaInscricao: "nao",
    valorInscricao: "",
    solicitaMensalidade: "nao",
    valorMensalidade: "",
    valorTotal: "",
    parecerSuperior: "",
    decisaoSuperior: "",
    dataSuperior: "",
    parecerDiretor: "",
    decisaoDiretor: "",
    dataDiretor: "",
  });

  const [fase, setFase] = useState<1 | 2 | 3>(1);
  const [pdfPronto, setPdfPronto] = useState(false);

  // Lê a URL ao carregar a página para definir a fase
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dadosBase64 = params.get("dados");

    if (dadosBase64) {
      try {
        // Usamos decodeURIComponent para evitar problemas com acentos no Base64
        const jsonString = decodeURIComponent(atob(dadosBase64));
        const dadosRecuperados = JSON.parse(jsonString);

        setFormData((prev) => ({ ...prev, ...dadosRecuperados }));

        // Lógica para descobrir a fase
        if (
          dadosRecuperados.parecerSuperior &&
          !dadosRecuperados.parecerDiretor
        ) {
          setFase(3); // Se o superior já deu parecer, é a vez do Diretor (Fase 3)
        } else if (dadosRecuperados.nome) {
          setFase(2); // Se tem nome, mas não tem parecer, é a vez do Superior (Fase 2)
        }
      } catch (error) {
        console.error("Erro ao ler dados da URL", error);
        alert("Link inválido ou corrompido.");
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setPdfPronto(false);
  };

  const handleGerarLink = () => {
    // Adiciona a data automática para quem está assinando a etapa
    const dadosAtualizados = { ...formData };
    const hoje = new Date().toLocaleDateString("pt-BR");

    if (fase === 2) dadosAtualizados.dataSuperior = hoje;
    if (fase === 3) dadosAtualizados.dataDiretor = hoje;

    setFormData(dadosAtualizados);

    // Converte para JSON e depois para Base64 seguro para URL
    const jsonString = JSON.stringify(dadosAtualizados);
    const base64 = btoa(encodeURIComponent(jsonString));

    const url = `${window.location.origin}${window.location.pathname}?dados=${base64}`;

    // Copia para a área de transferência
    navigator.clipboard.writeText(url);
    alert(
      "Link gerado e copiado com sucesso! Envie para o próximo responsável.",
    );
  };

  return (
    <div className="form-container">
      <h2>
        Solicitação de Apoio a Cursos -{" "}
        {fase === 1
          ? "Servidor"
          : fase === 2
            ? "Superior Imediato"
            : "Diretor Geral"}
      </h2>

      {fase > 1 && (
        <p style={{ color: "red" }}>
          Atenção: Os dados das fases anteriores estão bloqueados para edição.
        </p>
      )}

      {/* Renderiza a Fase 1 (Servidor) */}
      <FormServidor
        formData={formData}
        onChange={handleInputChange}
        disabled={fase > 1}
        onGerarLink={handleGerarLink}
      />

      {/* Renderiza a Fase 2 (Chefe Imediato) */}
      {fase >= 2 && (
        <FormSuperior
          formData={formData}
          onChange={handleInputChange}
          disabled={fase > 2}
          onGerarLink={handleGerarLink}
        />
      )}

      {/* Renderiza a Fase 3 (Diretor Geral) */}
      {fase === 3 && (
        <FormDiretorGeral
          formData={formData}
          onChange={handleInputChange}
          pdfPronto={pdfPronto}
          setPdfPronto={setPdfPronto}
        />
      )}
    </div>
  );
};

export default SolicitacaoCursos;
