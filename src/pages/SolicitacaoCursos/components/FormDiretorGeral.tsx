// src/pages/SolicitacaoCursos/FormDiretorGeral.tsx
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SolicitacaoCursosPdf from "../../../pdf/SolicitacaoCursosPdf";
import { type FormData } from "../SolicitacaoCursos";

interface FormDiretorGeralProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  pdfPronto: boolean;
  setPdfPronto: (pronto: boolean) => void;
}

const FormDiretorGeral: React.FC<FormDiretorGeralProps> = ({
  formData,
  onChange,
  pdfPronto,
  setPdfPronto,
}) => {
  const isFormValid =
    formData.parecerDiretor.trim() !== "" && formData.decisaoDiretor !== "";

  return (
    <fieldset
      className="form-section"
      style={{ marginTop: "20px", backgroundColor: "#eef6ff", padding: "15px" }}
    >
      <h3>Parecer do Diretor Geral</h3>
      <textarea
        name="parecerDiretor"
        placeholder="Digite o parecer fundamentado..."
        value={formData.parecerDiretor}
        onChange={onChange}
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      ></textarea>

      <div className="radio-group">
        <label>Decisão:</label>
        <label>
          <input
            type="radio"
            name="decisaoDiretor"
            value="deferido"
            checked={formData.decisaoDiretor === "deferido"}
            onChange={onChange}
          />{" "}
          Deferido
        </label>
        <label>
          <input
            type="radio"
            name="decisaoDiretor"
            value="indeferido"
            checked={formData.decisaoDiretor === "indeferido"}
            onChange={onChange}
          />{" "}
          Indeferido
        </label>
      </div>

      {!pdfPronto ? (
        <button
          type="button"
          disabled={!isFormValid}
          className="generate-pdf-button"
          onClick={() => setPdfPronto(true)}
          style={{
            backgroundColor: "#dc3545",
            marginTop: "15px",
            width: "100%",
            opacity: !isFormValid ? 0.5 : 1,
            cursor: !isFormValid ? "not-allowed" : "pointer",
          }}
        >
          {isFormValid
            ? "Preparar PDF Final"
            : "Preencha o Parecer e a Decisão para finalizar"}
        </button>
      ) : (
        <PDFDownloadLink
          document={<SolicitacaoCursosPdf formData={formData} />}
          fileName="solicitacao_cursos_final.pdf"
          className="generate-pdf-button"
          style={{
            backgroundColor: "#dc3545",
            marginTop: "15px",
            display: "block",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          {({ loading }) => (loading ? "Processando..." : "Baixar PDF Final")}
        </PDFDownloadLink>
      )}
    </fieldset>
  );
};

export default FormDiretorGeral;
