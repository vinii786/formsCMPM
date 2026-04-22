// src/pages/DeclaracaoNaoOcupacao/DeclaracaoNaoOcupacao.tsx
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DeclaracaoNaoOcupacaoPdf from "../../pdf/DeclaracaoNaoOcupacaoPdf";
import "../FormularioFerias/FormularioFerias.css";

interface FormData {
  nome: string;
  cpf: string;
  rua: string;
  numero: string;
  cargo: string;
}

const DeclaracaoNaoOcupacao = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cpf: "",
    rua: "",
    numero: "",
    cargo: "",
  });

  const [documentoPronto, setDocumentoPronto] =
    useState<React.ReactElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = <DeclaracaoNaoOcupacaoPdf formData={formData} />;
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Declaração Quanto a Ocupação de Cargos Públicos</h2>

      <div className="form-section">
        <h3>Dados Pessoais</h3>
        <div className="form-grid">
          <input
            type="text"
            name="nome"
            placeholder="Seu Nome Completo"
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

      <div className="form-section">
        <h3>Endereço</h3>
        <div className="form-grid">
          <input
            type="text"
            name="rua"
            placeholder="Nome da Rua / Av."
            value={formData.rua}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="numero"
            placeholder="Nº"
            value={formData.numero}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Cargo</h3>
        <input
          type="text"
          name="cargo"
          placeholder="Cargo para o qual está a tomar posse"
          value={formData.cargo}
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
        <div
          className="download-link-container"
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          <PDFDownloadLink
            document={documentoPronto as any}
            fileName="declaracao_nao_ocupacao.pdf"
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

export default DeclaracaoNaoOcupacao;
