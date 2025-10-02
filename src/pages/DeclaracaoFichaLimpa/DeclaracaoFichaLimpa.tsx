// src/pages/DeclaracaoFichaLimpa/DeclaracaoFichaLimpa.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DeclaracaoFichaLimpaPdf from "../../pdf/DeclaracaoFichaLimpaPdf";
import "../FormularioFerias/FormularioFerias.css";

interface FormData {
  nome: string;
  cpf: string;
}

const DeclaracaoFichaLimpa = () => {
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
    const doc = <DeclaracaoFichaLimpaPdf formData={formData} />;
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Declaração - Ficha Limpa Municipal (LC 356/2011)</h2>

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
        Gerar Declaração
      </button>

      {documentoPronto && (
        <div
          className="download-link-container"
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          <PDFDownloadLink
            document={documentoPronto as any}
            fileName="declaracao_ficha_limpa.pdf"
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

export default DeclaracaoFichaLimpa;
