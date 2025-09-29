// src/pages/Adiantamento13/Adiantamento13.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Adiantamento13Pdf from "../../pdf/Adiantamento13Pdf";
import "../FormularioFerias/FormularioFerias.css";

interface FormData {
  nome: string;
  matricula: string;
  cpf: string;
  lotacao: string;
  portaria: string;
}

const Adiantamento13 = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    matricula: "",
    cpf: "",
    lotacao: "",
    portaria: "",
  });

  const [documentoPronto, setDocumentoPronto] =
    useState<React.ReactElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = <Adiantamento13Pdf formData={formData} />;
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Requerimento de Antecipação da 1ª Parcela do 13° Salário</h2>

      <div className="form-section">
        <h3>1. Dados do Requisitante</h3>
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
        <h3>2. Assunto</h3>
        <p>Com base na Portaria nº:</p>
        <input
          type="text"
          name="portaria"
          placeholder="Número da Portaria"
          value={formData.portaria}
          onChange={handleInputChange}
          className="form-input-full"
        />
      </div>

      <button
        onClick={handleGerarPdfClick}
        className="generate-pdf-button"
        style={{
          marginTop: "1rem",
          display: "block",
          textAlign: "center",
          width: "100%",
          border: "none",
        }}
      >
        Gerar PDF
      </button>

      {documentoPronto && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <PDFDownloadLink
            document={documentoPronto}
            fileName="adiantamento_13.pdf"
            className="download-link"
          >
            {({ loading }) =>
              loading
                ? "A carregar documento..."
                : "Download Pronto! Clique aqui para transferir."
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default Adiantamento13;
