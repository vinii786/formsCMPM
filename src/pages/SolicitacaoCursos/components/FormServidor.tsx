// src/pages/SolicitacaoCursos/FormServidor.tsx
import React from "react";
import { type FormData } from "../SolicitacaoCursos";

interface FormServidorProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  disabled: boolean;
  onGerarLink: () => void;
}

const FormServidor: React.FC<FormServidorProps> = ({
  formData,
  onChange,
  disabled,
  onGerarLink,
}) => {
  const isFormValid =
    formData.nome.trim() !== "" && formData.matricula.trim() !== "";

  return (
    <fieldset
      disabled={disabled}
      style={{ border: "none", padding: 0, margin: 0 }}
    >
      <div className="form-section">
        <h3>I - Identificação do Servidor</h3>
        <div className="form-grid">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={onChange}
          />
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={formData.matricula}
            onChange={onChange}
          />
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={formData.endereco}
            onChange={onChange}
          />
          <input
            type="text"
            name="lotacao"
            placeholder="Lotação"
            value={formData.lotacao}
            onChange={onChange}
          />
          <input
            type="text"
            name="celular"
            placeholder="Celular"
            value={formData.celular}
            onChange={onChange}
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={onChange}
          />
          <input
            type="text"
            name="identidade"
            placeholder="Identidade"
            value={formData.identidade}
            onChange={onChange}
          />
          <input
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
            onChange={onChange}
          />
          <input
            type="email"
            name="emailServidor"
            placeholder="Email"
            value={formData.emailServidor}
            onChange={onChange}
          />
          <input
            type="text"
            name="ramal"
            placeholder="Ramal"
            value={formData.ramal}
            onChange={onChange}
          />
        </div>

        <div className="radio-group" style={{ marginTop: "1rem" }}>
          <label>Função de Confiança:</label>
          <label>
            <input
              type="radio"
              name="funcaoConfianca"
              value="sim"
              checked={formData.funcaoConfianca === "sim"}
              onChange={onChange as any}
            />{" "}
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="funcaoConfianca"
              value="nao"
              checked={formData.funcaoConfianca === "nao"}
              onChange={onChange as any}
            />{" "}
            Não
          </label>
        </div>

        {formData.funcaoConfianca === "sim" && (
          <div className="conditional-input">
            <div style={{ display: "flex" }}>
              <label>Cargo de Direção</label>
              <div>
                <input
                  type="radio"
                  name="tipoFuncao"
                  value="direcao"
                  checked={formData.tipoFuncao === "direcao"}
                  onChange={onChange as any}
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <label>Função Gratificada</label>
              <div>
                <input
                  type="radio"
                  name="tipoFuncao"
                  value="gratificada"
                  checked={formData.tipoFuncao === "gratificada"}
                  onChange={onChange as any}
                />
              </div>
            </div>
            {formData.tipoFuncao === "gratificada" && (
              <input
                type="text"
                name="qualFuncao"
                placeholder="Qual?"
                value={formData.qualFuncao}
                onChange={onChange}
                style={{ marginTop: "0.5rem" }}
              />
            )}
          </div>
        )}
      </div>

      <div className="form-section">
        <h3>II - Identificação do Curso</h3>
        <label>Descrição do Curso:</label>
        <textarea
          name="descricaoCurso"
          placeholder="Descreva brevemente o tema do curso"
          value={formData.descricaoCurso}
          onChange={onChange}
          rows={3}
        ></textarea>

        <input
          type="text"
          name="fornecedor"
          placeholder="Dados do Fornecedor"
          value={formData.fornecedor}
          onChange={onChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />

        <div className="form-grid">
          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            value={formData.cnpj}
            onChange={onChange}
          />
          <input
            type="text"
            name="contato"
            placeholder="Contato (Telefone)"
            value={formData.contato}
            onChange={onChange}
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChange={onChange}
          />
          <input
            type="email"
            name="emailFornecedor"
            placeholder="Email do Fornecedor"
            value={formData.emailFornecedor}
            onChange={onChange}
          />
          <input
            type="text"
            name="inicioTermino"
            placeholder="Início/Término Ex: 02/10/2025 a 15/12/2025"
            value={formData.inicioTermino}
            onChange={onChange}
          />
          <input
            type="text"
            name="cargaHorariaTotal"
            placeholder="Carga Horária Total"
            value={formData.cargaHorariaTotal}
            onChange={onChange}
          />
          <input
            type="text"
            name="cargaHorariaDiaria"
            placeholder="Carga Horária Diária"
            value={formData.cargaHorariaDiaria}
            onChange={onChange}
          />
        </div>

        <input
          type="text"
          name="formaApresentacao"
          placeholder="Forma de Apresentação (presencial, online, etc.)"
          value={formData.formaApresentacao}
          onChange={onChange}
          className="form-input-full"
          style={{ marginTop: "1rem" }}
        />

        <div className="radio-group" style={{ marginTop: "1rem" }}>
          <label>Uso para progressão na carreira?</label>
          <label>
            <input
              type="radio"
              name="usoProgressao"
              value="sim"
              checked={formData.usoProgressao === "sim"}
              onChange={onChange as any}
            />{" "}
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="usoProgressao"
              value="nao"
              checked={formData.usoProgressao === "nao"}
              onChange={onChange as any}
            />{" "}
            Não
          </label>
        </div>
      </div>

      <div className="form-section">
        <h3>III - Apoio Financeiro Solicitado</h3>
        <div className="form-grid">
          <div>
            <label>Inscrição:</label>
            <label>
              <input
                type="radio"
                name="solicitaInscricao"
                value="sim"
                checked={formData.solicitaInscricao === "sim"}
                onChange={onChange as any}
              />{" "}
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="solicitaInscricao"
                value="nao"
                checked={formData.solicitaInscricao === "nao"}
                onChange={onChange as any}
              />{" "}
              Não
            </label>
            <input
              type="text"
              name="valorInscricao"
              placeholder="Valor da Inscrição"
              value={formData.valorInscricao}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Mensalidade:</label>
            <label>
              <input
                type="radio"
                name="solicitaMensalidade"
                value="sim"
                checked={formData.solicitaMensalidade === "sim"}
                onChange={onChange as any}
              />{" "}
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="solicitaMensalidade"
                value="nao"
                checked={formData.solicitaMensalidade === "nao"}
                onChange={onChange as any}
              />{" "}
              Não
            </label>
            <input
              type="text"
              name="valorMensalidade"
              placeholder="Valor por Mês"
              value={formData.valorMensalidade}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      {!disabled && (
        <button
          onClick={onGerarLink}
          className="generate-pdf-button"
          style={{
            marginTop: "2rem",
            width: "100%",
            opacity: !isFormValid ? 0.5 : 1,
            cursor: !isFormValid ? "not-allowed" : "pointer",
          }}
          disabled={!isFormValid}
        >
          {isFormValid
            ? "Gerar Link para Superior Imediato"
            : "Preencha o formulário para continuar"}
        </button>
      )}
    </fieldset>
  );
};

export default FormServidor;
