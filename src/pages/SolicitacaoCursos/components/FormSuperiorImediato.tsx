// src/pages/SolicitacaoCursos/FormSuperiorImediato.tsx
import React from "react";
import { type FormData } from "../SolicitacaoCursos";

interface FormSuperiorImediatoProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  disabled: boolean;
  onGerarLink: () => void;
}

const FormSuperiorImediato: React.FC<FormSuperiorImediatoProps> = ({
  formData,
  onChange,
  disabled,
  onGerarLink,
}) => {
  const isFormValid =
    formData.parecerSuperior.trim() !== "" && formData.decisaoSuperior !== "";

  return (
    <fieldset
      disabled={disabled}
      className="form-section"
      style={{ marginTop: "20px", backgroundColor: "#f9f9f9", padding: "15px" }}
    >
      <h3>Parecer do Superior Imediato</h3>
      <textarea
        name="parecerSuperior"
        placeholder="Digite o parecer fundamentado..."
        value={formData.parecerSuperior}
        onChange={onChange}
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      ></textarea>

      <div className="radio-group">
        <label>Decisão:</label>
        <label>
          <input
            type="radio"
            name="decisaoSuperior"
            value="deferido"
            checked={formData.decisaoSuperior === "deferido"}
            onChange={onChange}
          />{" "}
          Deferido
        </label>
        <label>
          <input
            type="radio"
            name="decisaoSuperior"
            value="indeferido"
            checked={formData.decisaoSuperior === "indeferido"}
            onChange={onChange}
          />{" "}
          Indeferido
        </label>
      </div>

      {!disabled && (
        <button
          onClick={onGerarLink}
          className="generate-pdf-button"
          style={{
            backgroundColor: "#28a745",
            marginTop: "1rem",
            width: "100%",
            opacity: !isFormValid ? 0.5 : 1,
            cursor: !isFormValid ? "not-allowed" : "pointer",
          }}
          disabled={!isFormValid}
        >
          {isFormValid
            ? "Gerar Link para Diretor Geral"
            : "Preencha o Parecer e a Decisão para continuar"}
        </button>
      )}
    </fieldset>
  );
};

export default FormSuperiorImediato;
