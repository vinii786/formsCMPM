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
  periodoGozo: "30" | "outro";
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePeriodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "30" | "outro";
    setFormData((prev) => ({ ...prev, periodoGozo: value }));
  };

  return (
    <div className="form-container">
      <h2>Requerimento de Férias Regulamentares</h2>
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
              value="outro"
              checked={formData.periodoGozo === "outro"}
              onChange={handlePeriodoChange}
            />{" "}
            Outro(s) período(s)
          </label>
        </div>
        {formData.periodoGozo === "outro" && (
          <div className="conditional-input">
            <label htmlFor="outrosDias">Quantos dias?</label>
            <input
              id="outrosDias"
              type="number"
              name="outrosDias"
              value={formData.outrosDias}
              onChange={handleInputChange}
              placeholder="Ex: 15"
            />
          </div>
        )}
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
