// src/pages/OcorrenciaPonto/OcorrenciaPonto.tsx
import React, { useState } from "react";
// 1. Importamos a função 'pdf' em vez do componente PDFDownloadLink
import { pdf } from "@react-pdf/renderer";
import OcorrenciaPontoPdf from "../../pdf/OcorrenciaPontoPdf";
import "../FormularioFerias/FormularioFerias.css";

interface Ocorrencia {
  id: number;
  data: string;
  horario: string;
  referente: "dia" | "entrada" | "saida";
  justificativa: string;
}

interface ServidorInfo {
  servidor: string;
  matricula: string;
  cargo: string;
  chefia: string;
}

const OcorrenciaPonto = () => {
  const [servidorInfo, setServidorInfo] = useState<ServidorInfo>({
    servidor: "",
    matricula: "",
    cargo: "",
    chefia: "",
  });

  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([
    { id: 1, data: "", horario: "", referente: "entrada", justificativa: "" },
  ]);

  // Estado para controlar o status do botão
  const [gerandoPdf, setGerandoPdf] = useState(false);

  const handleServidorInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServidorInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOcorrenciaChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const novasOcorrencias = [...ocorrencias];
    novasOcorrencias[index] = { ...novasOcorrencias[index], [name]: value };
    setOcorrencias(novasOcorrencias);
  };

  const adicionarOcorrencia = () => {
    setOcorrencias([
      ...ocorrencias,
      {
        id: Date.now(),
        data: "",
        horario: "",
        referente: "entrada",
        justificativa: "",
      },
    ]);
  };

  const removerOcorrencia = (index: number) => {
    if (ocorrencias.length <= 1) return;
    const novasOcorrencias = ocorrencias.filter((_, i) => i !== index);
    setOcorrencias(novasOcorrencias);
  };

  // 2. Nova função assíncrona para gerar e baixar o PDF manualmente
  const handleDownloadClick = async () => {
    setGerandoPdf(true);

    const doc = (
      <OcorrenciaPontoPdf
        servidorInfo={servidorInfo}
        ocorrencias={ocorrencias}
      />
    );
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ocorrencia_ponto.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Libera a memória

    setGerandoPdf(false);
  };

  return (
    <div className="form-container">
      <h2>Ocorrência de Ponto</h2>
      {/* ... (o formulário JSX continua exatamente igual) ... */}
      <div className="form-section">
        <h3>Dados do Servidor</h3>
        <input
          type="text"
          name="servidor"
          placeholder="Nome do Servidor"
          value={servidorInfo.servidor}
          onChange={handleServidorInfoChange}
          className="form-input-full"
        />
        <div className="form-grid">
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={servidorInfo.matricula}
            onChange={handleServidorInfoChange}
          />
          <input
            type="text"
            name="cargo"
            placeholder="Cargo/Função"
            value={servidorInfo.cargo}
            onChange={handleServidorInfoChange}
          />
        </div>
      </div>
      <h3>Ocorrências</h3>
      {ocorrencias.map((ocorrencia, index) => (
        <div key={ocorrencia.id} className="form-section occurrence-block">
          <div className="occurrence-header">
            <h4>Ocorrência #{index + 1}</h4>
            {ocorrencias.length > 1 && (
              <button
                onClick={() => removerOcorrencia(index)}
                className="remove-btn"
              >
                Remover
              </button>
            )}
          </div>
          <div className="form-grid">
            <input
              type="date"
              name="data"
              value={ocorrencia.data}
              onChange={(e) => handleOcorrenciaChange(index, e)}
            />
            <input
              type="time"
              name="horario"
              value={ocorrencia.horario}
              onChange={(e) => handleOcorrenciaChange(index, e)}
            />
          </div>
          <div className="radio-group" style={{ marginTop: "1rem" }}>
            <label>
              <input
                type="radio"
                name="referente"
                value="dia"
                checked={ocorrencia.referente === "dia"}
                onChange={(e) => handleOcorrenciaChange(index, e as any)}
              />{" "}
              Dia todo
            </label>
            <label>
              <input
                type="radio"
                name="referente"
                value="entrada"
                checked={ocorrencia.referente === "entrada"}
                onChange={(e) => handleOcorrenciaChange(index, e as any)}
              />{" "}
              Entrada
            </label>
            <label>
              <input
                type="radio"
                name="referente"
                value="saida"
                checked={ocorrencia.referente === "saida"}
                onChange={(e) => handleOcorrenciaChange(index, e as any)}
              />{" "}
              Saída
            </label>
          </div>
          <textarea
            name="justificativa"
            placeholder="Justificativa para esta ocorrência..."
            value={ocorrencia.justificativa}
            onChange={(e) => handleOcorrenciaChange(index, e)}
          ></textarea>
        </div>
      ))}
      <button onClick={adicionarOcorrencia} className="add-btn">
        + Adicionar Nova Ocorrência
      </button>
      <div className="form-section" style={{ marginTop: "2rem" }}>
        <h3>Chefia Imediata</h3>
        <input
          type="text"
          name="chefia"
          placeholder="Nome da Chefia Imediata para ciência"
          value={servidorInfo.chefia}
          onChange={handleServidorInfoChange}
          className="form-input-full"
        />
      </div>

      {/* 3. O botão agora é um botão simples que chama nossa nova função */}
      <button
        onClick={handleDownloadClick}
        className="generate-pdf-button"
        disabled={gerandoPdf}
        style={{
          marginTop: "1rem",
          display: "block",
          textAlign: "center",
          width: "100%",
          border: "none",
        }}
      >
        {gerandoPdf ? "Gerando PDF..." : "Gerar PDF e Baixar"}
      </button>
    </div>
  );
};

export default OcorrenciaPonto;
