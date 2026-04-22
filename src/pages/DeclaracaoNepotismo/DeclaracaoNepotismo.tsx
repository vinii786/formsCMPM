// src/pages/DeclaracaoNepotismo/DeclaracaoNepotismo.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DeclaracaoNepotismoPdf from "../../pdf/DeclaracaoNepotismoPdf";
import "../FormularioFerias/FormularioFerias.css";

interface FormData {
  nome: string;
  cpf: string;
}

const DeclaracaoNepotismo = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cpf: "",
  });

  const [documentoPronto, setDocumentoPronto] =
    useState<React.ReactElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = <DeclaracaoNepotismoPdf formData={formData} />;
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Declaração de Inexistência de Nepotismo</h2>

      <div className="form-section">
        <h3>Seus Dados</h3>
        <div className="form-grid">
          <input
            type="text"
            name="nome"
            placeholder="Nome Completo"
            value={formData.nome}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleInputChange}
          />
        </div>
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
        <div
          className="download-link-container"
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          <PDFDownloadLink
            document={documentoPronto as any}
            fileName="declaracao_nepotismo.pdf"
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

export default DeclaracaoNepotismo;
