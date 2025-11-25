import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
// Importe o componente PDF correspondente (você precisará criá-lo)
import RequisicaoAlmoxarifadoPdf from "../../pdf/RequisicaoAlmoxarifadoPdf"; 
import "../FormularioFerias/FormularioFerias.css"; // Reutilizando os estilos

// Interface para um item da requisição
interface ItemRequisicao {
  id: number;
  descricao: string;
  quantidadeSolicitada: string;
  quantidadeAtendida: string;
}

// Interface para os dados do formulário de Requisição de Almoxarifado
interface FormData {
  // Campos do Cabeçalho (Anexo I)
  dataEmissao: string;
  requisicaoNum: string;
  requisitante: string;
  lotacao: string;
  justificativa: string;
  
  // Campos de Recebimento/Entrega
  dataRecebimento: string;
  entreguePor: string;
  recebidoPor: string;
  matriculaRecebedor: string;
}

const RequisicaoManualAlmoxarifado = () => {
  const [formData, setFormData] = useState<FormData>({
    dataEmissao: new Date().toLocaleDateString('pt-BR'), // Data atual como padrão
    requisicaoNum: "",
    requisitante: "",
    lotacao: "",
    justificativa: "",
    dataRecebimento: "",
    entreguePor: "",
    recebidoPor: "",
    matriculaRecebedor: "",
  });

  const [itens, setItens] = useState<ItemRequisicao[]>([
    { id: 1, descricao: "", quantidadeSolicitada: "", quantidadeAtendida: "" },
  ]);

  const [documentoPronto, setDocumentoPronto] =
    useState<React.ReactElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDocumentoPronto(null);
  };

  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const novosItens = [...itens];
    
    // O nome do input deve ser 'descricao', 'quantidadeSolicitada' ou 'quantidadeAtendida'
    if (name === 'descricao') {
        novosItens[index].descricao = value;
    } else if (name === 'quantidadeSolicitada') {
        novosItens[index].quantidadeSolicitada = value;
    } else if (name === 'quantidadeAtendida') {
        novosItens[index].quantidadeAtendida = value;
    }

    setItens(novosItens);
    setDocumentoPronto(null);
  };

  const adicionarItem = () => {
    setItens([
      ...itens,
      {
        id: Date.now(),
        descricao: "",
        quantidadeSolicitada: "",
        quantidadeAtendida: "",
      },
    ]);
  };

  const removerItem = (index: number) => {
    if (itens.length <= 1) return;
    setItens(itens.filter((_, i) => i !== index));
    setDocumentoPronto(null);
  };

  const handleGerarPdfClick = () => {
    const doc = (
      // Certifique-se de que o componente PDF aceita 'formData' e 'itens'
      <RequisicaoAlmoxarifadoPdf 
          formData={formData} 
          itens={itens} 
      />
    );
    setDocumentoPronto(doc);
  };

  return (
    <div className="form-container">
      <h2>Requisição Manual de Materiais - Almoxarifado</h2>
      
      {/* Seção 1: Dados da Requisição */}
      <div className="form-section">
        <h3>Dados da Requisição [cite: 3]</h3>
        <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <input
            type="text"
            name="requisicaoNum"
            placeholder="REQUISIÇÃO Nº"
            value={formData.requisicaoNum}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="dataEmissao"
            placeholder="DATA (Ex: DD/MM/AAAA)"
            value={formData.dataEmissao}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="text"
          name="requisitante"
          placeholder="REQUISITANTE"
          value={formData.requisitante}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: '1rem' }}
        />
        <input
          type="text"
          name="lotacao"
          placeholder="LOTAÇÃO"
          value={formData.lotacao}
          onChange={handleInputChange}
          className="form-input-full"
          style={{ marginTop: '1rem' }}
        />
        <h4>JUSTIFICATIVA [cite: 3]</h4>
        <textarea
          name="justificativa"
          value={formData.justificativa}
          onChange={handleInputChange}
          rows={3}
        ></textarea>
      </div>

      {/* Seção 2: Itens Solicitados */}
      <div className="form-section">
        <h3>Itens Solicitados [cite: 4]</h3>
        <div className="table-header" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 50px', gap: '0.5rem', fontWeight: 'bold' }}>
            <span>DESCRIÇÃO</span>
            <span style={{textAlign: 'center'}}>QTDE. SOLICITADA</span>
            <span style={{textAlign: 'center'}}>QTDE. ATENDIDA</span>
            <span></span>
        </div>
        
        {itens.map((item, index) => (
          <div key={item.id} className="item-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 50px', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <input
              type="text"
              name="descricao"
              value={item.descricao}
              onChange={(e) => handleItemChange(index, e as React.ChangeEvent<HTMLInputElement>)}
              placeholder="Descrição do material"
            />
            <input
              type="number"
              name="quantidadeSolicitada"
              value={item.quantidadeSolicitada}
              onChange={(e) => handleItemChange(index, e as React.ChangeEvent<HTMLInputElement>)}
              placeholder="Solic."
              style={{ textAlign: 'center' }}
            />
            <input
              type="number"
              name="quantidadeAtendida"
              value={item.quantidadeAtendida}
              onChange={(e) => handleItemChange(index, e as React.ChangeEvent<HTMLInputElement>)}
              placeholder="Atend."
              style={{ textAlign: 'center' }}
            />
            {itens.length > 1 && (
              <button
                onClick={() => removerItem(index)}
                className="remove-btn"
                style={{ height: '38px', padding: '0 5px' }}
              >
                X
              </button>
            )}
          </div>
        ))}
        <button onClick={adicionarItem} className="add-btn">
          + Adicionar Item
        </button>
      </div>

      {/* Seção 3: Recebimento/Entrega */}
      <div className="form-section">
        <h3>Dados Recebimento/Entrega [cite: 5]</h3>
        <input
          type="text"
          name="dataRecebimento"
          placeholder="DATA RECEBIMENTO/ENTREGA (Ex: DD/MM/AAAA)"
          value={formData.dataRecebimento}
          onChange={handleInputChange}
          className="form-input-full"
        />
        <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <input
            type="text"
            name="entreguePor"
            placeholder="ENTREGUE POR"
            value={formData.entreguePor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="recebidoPor"
            placeholder="RECEBIDO POR"
            value={formData.recebidoPor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="matriculaRecebedor"
            placeholder="MATRÍCULA do Recebedor"
            value={formData.matriculaRecebedor}
            onChange={handleInputChange}
          />
          {/* O campo de Assinatura não é preenchível, é um espaço no PDF */}
          <input
            type="text"
            placeholder="Assinatura (preencher no documento impresso)"
            disabled
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
        Gerar PDF de Requisição
      </button>

      {documentoPronto && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <PDFDownloadLink
            document={documentoPronto as any}
            fileName={`requisicao_almoxarifado_${formData.requisicaoNum || 'sem_numero'}.pdf`}
            className="download-link"
          >
            {({ loading }) =>
              loading
                ? "A carregar documento..."
                : "Download Pronto!!! Clique aqui para transferir."
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default RequisicaoManualAlmoxarifado;