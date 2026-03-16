// src/pages/FormularioFerias/FormularioFerias.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import FeriasPdfDocument from "../../pdf/FeriasPdfDocument";
import "./FormularioFerias.css";

interface FormData {
  nome: string;
  matricula: string;
  cpf: string;
  lotacao: string;
  periodoGozo: "30" | "20" | "15" | "10";
  dataInicio: string;
  justificativa: string;
  outrosDias: string;
  dataRequerimento: Date;
}

const FormularioFerias = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    matricula: "",
    cpf: "",
    lotacao: "",
    periodoGozo: "30",
    dataInicio: "",
    justificativa: "",
    outrosDias: "",
    dataRequerimento: new Date(),
  });
  const [pdfPronto, setPdfPronto] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPdfPronto(false);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePeriodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfPronto(false); // Esconde o botão de download se mudar os dias
    const value = e.target.value as "30" | "20" | "15" | "10";
    setFormData((prev) => ({
      ...prev,
      periodoGozo: value,
      // Limpa a justificativa se voltar para 30 dias
      justificativa: value === "30" ? "" : prev.justificativa,
    }));
  };

  // Regra: Válido se for 30 dias, OU se a justificativa não estiver vazia
  const isFormValid =
    formData.periodoGozo === "30" || formData.justificativa.trim() !== "";

  return (
    <div className="form-container">
      <h2>Requerimento de Férias Regulamentares</h2>
      <p>LEI COMPLEMENTAR Nº 2/1990</p>
      <p>
        DISPÕE SOBRE O ESTATUTO DOS SERVIDORES PÚBLICOS DO MUNICÍPIO DE PATOS DE
        MINAS.
      </p>
      <p>
        Art. 69 É proibida a acumulação de férias, salvo por absoluta
        necessidade do serviço e pelo Maximo de 2 (dois) anos.
      </p>
      <p>
        § 1º Em casos excepcionais, à critério da administração, as férias
        poderão ser gozadas em 2 (dois) períodos, nenhum dos quais poderá ser
        inferior a 10 (dez) dias.
      </p>
      <p>
        § 2º Somente serão considerados como não gozadas, por absoluta
        necessidade do serviço, as férias que o servidor deixar de gozar,
        mediante decisão escrita do Presidente da Câmara, exarada em processo e
        publicada na forma legal, dentro do exercício a que elas correspondem.
      </p>
      <div className="form-section">
        <h3>1. Dados do requisitante</h3>
        <div className="form-grid">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={formData.matricula}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lotacao"
            placeholder="Lotação"
            value={formData.lotacao}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-section">
        <h3>2. Período de gozo</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="periodoGozo"
              value="30"
              checked={formData.periodoGozo === "30"}
              onChange={handlePeriodoChange}
            />{" "}
            30 dias
          </label>

          <label>
            <input
              type="radio"
              name="periodoGozo"
              value="20"
              checked={formData.periodoGozo === "20"}
              onChange={handlePeriodoChange}
            />{" "}
            20 dias
          </label>

          <label>
            <input
              type="radio"
              name="periodoGozo"
              value="15"
              checked={formData.periodoGozo === "15"}
              onChange={handlePeriodoChange}
            />{" "}
            15 dias
          </label>

          <label>
            <input
              type="radio"
              name="periodoGozo"
              value="10"
              checked={formData.periodoGozo === "10"}
              onChange={handlePeriodoChange}
            />{" "}
            10 dias
          </label>
        </div>
        <label style={{ marginTop: "1rem", display: "block" }}>
          A partir de:
        </label>
        <input
          type="date"
          name="dataInicio"
          value={formData.dataInicio}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-section">
        <label>
          Justificativa{" "}
          <i>
            (em caso de período de gozo diferente de 30 dias ou em caso de
            parcelamento das férias)
          </i>
          :
        </label>
        <textarea
          name="justificativa"
          placeholder="Obrigatório caso haja parcelamento ou solicitação inferior a 30 dias"
          value={formData.justificativa}
          onChange={handleInputChange}
          disabled={formData.periodoGozo === "30"}
          style={{
            backgroundColor: formData.periodoGozo === "30" ? "#e9ecef" : "#fff",
            cursor: formData.periodoGozo === "30" ? "not-allowed" : "text",
          }}
        ></textarea>

        {!isFormValid && (
          <span
            style={{
              color: "red",
              fontSize: "0.85rem",
              marginTop: "5px",
              display: "block",
            }}
          >
            * Preencha a justificativa para prosseguir.
          </span>
        )}
      </div>

      {!pdfPronto ? (
        <button
          type="button"
          className="generate-pdf-button"
          onClick={() => setPdfPronto(true)}
          disabled={!isFormValid}
          style={{
            opacity: !isFormValid ? 0.5 : 1,
            cursor: !isFormValid ? "not-allowed" : "pointer",
            marginTop: "15px",
          }}
        >
          Preparar PDF para Download
        </button>
      ) : (
        <PDFDownloadLink
          document={<FeriasPdfDocument data={formData as any} />}
          fileName="requerimento_ferias.pdf"
          className="generate-pdf-button"
          style={{ marginTop: "15px", display: "inline-block" }}
        >
          {({ loading }) => (loading ? "Processando..." : "Baixar PDF")}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default FormularioFerias;
