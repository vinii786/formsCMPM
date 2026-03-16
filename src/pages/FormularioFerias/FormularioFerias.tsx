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
  observacoes: string;
  outrosDias: string;
  dataRequerimento: Date;
}

const FormularioFerias = () => {
  // A correção foi aplicada aqui, adicionando <FormData>
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    matricula: "",
    cpf: "",
    lotacao: "",
    periodoGozo: "30",
    dataInicio: "",
    observacoes: "",
    outrosDias: "",
    dataRequerimento: new Date(),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePeriodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "30" | "20" | "15" | "10";
    setFormData((prev) => ({ ...prev, periodoGozo: value }));
  };

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
        mediante decisão escrita do Prefeito ou Presidente da Câmara, exarada em
        processo e publicada na forma legal, dentro do exercício a que elas
        correspondem.
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
        <label>Observações:</label>
        <textarea
          name="observacoes"
          placeholder="Observações..."
          value={formData.observacoes}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <PDFDownloadLink
        document={<FeriasPdfDocument data={formData as any} />}
        fileName="requerimento_ferias.pdf"
        className="generate-pdf-button"
      >
        {({ loading }) => (loading ? "Gerando PDF..." : "Gerar PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default FormularioFerias;
