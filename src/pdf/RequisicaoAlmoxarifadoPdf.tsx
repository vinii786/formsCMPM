// src/pdf/RequisicaoAlmoxarifadoPdf.tsx

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Interface de Tipos (Reutilizada do seu componente TSX)
interface ItemRequisicao {
  id: number;
  descricao: string;
  quantidadeSolicitada: string;
  quantidadeAtendida: string;
}

interface FormData {
  dataEmissao: string;
  requisicaoNum: string;
  requisitante: string;
  lotacao: string;
  justificativa: string;
  dataRecebimento: string;
  entreguePor: string;
  recebidoPor: string;
  matriculaRecebedor: string;
}

interface Props {
  formData: FormData;
  itens: ItemRequisicao[];
}

// Estilos do PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica', // Usando uma fonte padrão
  },
  // --- Cabeçalho ---
  header: {
    marginBottom: 20,
    alignItems: 'center',
    borderBottom: '1px solid #000',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  headerSubText: {
    fontSize: 10,
    marginBottom: 5,
  },
  infoBar: {
    fontSize: 8,
    width: '100%',
    textAlign: 'right',
    marginTop: 5,
  },
  // --- Seção de Dados (REQUISIÇÃO) ---
  section: {
    fontSize: 10,
    marginBottom: 10,
    border: '1px solid #000',
    padding: 5,
  },
  dataRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  dataLabel: {
    fontWeight: 'bold',
    width: 90, // Largura fixa para rótulos
  },
  dataValue: {
    flex: 1,
  },
  justificativa: {
    marginTop: 5,
    flexDirection: 'row',
  },
  // --- Tabela de Itens (CORRIGIDO) ---
  table: {
    width: 'auto', // Ocupa a largura necessária
    marginBottom: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    // display: 'table' foi removido para corrigir o erro de tipagem.
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    fontSize: 9,
  },
  tableCell: {
    margin: 1,
    padding: 3,
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  colDescricao: {
    width: '60%',
  },
  colQtde: {
    width: '15%',
    textAlign: 'center',
  },
  // --- Recebimento/Entrega ---
  recebimentoSection: {
    fontSize: 10,
    marginTop: 15,
    border: '1px solid #000',
    padding: 10,
  },
  signatureBox: {
    height: 30,
    borderBottom: '1px solid #000',
    marginBottom: 3,
    marginTop: 15,
  },
  signatureLabel: {
    fontSize: 8,
    textAlign: 'center',
  }
});

const RequisicaoAlmoxarifadoPdf: React.FC<Props> = ({ formData, itens }) => {

  const dataItens = itens.map((item, index) => ({
    item: index + 1,
    descricao: item.descricao,
    quantidadeSolicitada: item.quantidadeSolicitada,
    quantidadeAtendida: item.quantidadeAtendida,
  }));

  // Adiciona linhas vazias (total de 10) para manter o layout
  while (dataItens.length < 10) {
    dataItens.push({
      item: dataItens.length + 1,
      descricao: '',
      quantidadeSolicitada: '',
      quantidadeAtendida: '',
    });
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        [cite_start]{/* CABEÇALHO [cite: 2] */}
        <View style={styles.header}>
          <Text style={styles.headerText}>CÂMARA MUNICIPAL DE PATOS DE MINAS</Text>
          <Text style={styles.headerText}>PROTOCOLO DE ENTREGA DE MATERIAIS DE CONSUMO</Text>
          <Text style={styles.infoBar}>Data da emissão: {formData.dataEmissao || '___/__/___'}   Página: 1</Text>
        </View>

        [cite_start]{/* REQUISIÇÃO N° / DATA / LOTAÇÃO / JUSTIFICATIVA [cite: 3] */}
        <View style={styles.section}>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>REQUISIÇÃO Nº:</Text>
            <Text style={styles.dataValue}>{formData.requisicaoNum}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>DATA:</Text>
            <Text style={styles.dataValue}>{formData.dataEmissao}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>REQUISITANTE:</Text>
            <Text style={styles.dataValue}>{formData.requisitante}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>LOTAÇÃO:</Text>
            <Text style={styles.dataValue}>{formData.lotacao}</Text>
          </View>
          <View style={[styles.justificativa]}>
            <Text style={styles.dataLabel}>JUSTIFICATIVA:</Text>
            <Text style={styles.dataValue}>{formData.justificativa}</Text>
          </View>
        </View>

        [cite_start]{/* TABELA DE ITENS [cite: 4] */}
        <View style={styles.table}>
          {/* Cabeçalho da Tabela */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCell, { width: '10%' }]}>
              <Text>ITEM</Text>
            </View>
            <View style={[styles.tableCell, styles.colDescricao]}>
              <Text>DESCRIÇÃO</Text>
            </View>
            <View style={[styles.tableCell, styles.colQtde]}>
              <Text>QTDE.</Text>
            </View>
            <View style={[styles.tableCell, styles.colQtde, {borderRightWidth: 0}]}>
              <Text>QTDE. ATENDIDA</Text>
            </View>
          </View>
          
          {/* Linhas de Dados */}
          {dataItens.map((item, index) => (
            <View key={index} style={[styles.tableRow, { borderTopWidth: 1, borderTopColor: '#000' }]}>
              <View style={[styles.tableCell, { width: '10%', borderBottomWidth: (index === dataItens.length -1 ? 0 : 1) }]}>
                <Text>{item.item}</Text>
              </View>
              <View style={[styles.tableCell, styles.colDescricao, {borderBottomWidth: (index === dataItens.length -1 ? 0 : 1)}]}>
                <Text>{item.descricao}</Text>
              </View>
              <View style={[styles.tableCell, styles.colQtde, {borderBottomWidth: (index === dataItens.length -1 ? 0 : 1)}]}>
                <Text>{item.quantidadeSolicitada}</Text>
              </View>
              <View style={[styles.tableCell, styles.colQtde, {borderRightWidth: 0, borderBottomWidth: (index === dataItens.length -1 ? 0 : 1)}]}>
                <Text>{item.quantidadeAtendida}</Text>
              </View>
            </View>
          ))}
        </View>

        [cite_start]{/* DADOS RECEBIMENTO/ENTREGA [cite: 5] */}
        <View style={styles.recebimentoSection}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5 }}>DADOS RECEBIMENTO/ENTREGA REQUISIÇÃO Nº: {formData.requisicaoNum}</Text>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>DATA RECEBIMENTO/ENTREGA:</Text>
            <Text style={styles.dataValue}>{formData.dataRecebimento}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>ENTREGUE POR:</Text>
            <Text style={styles.dataValue}>{formData.entreguePor}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>RECEBIDO POR:</Text>
            <Text style={styles.dataValue}>{formData.recebidoPor}</Text>
          </View>
          
          {/* Assinatura e Matrícula */}
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ width: '50%', paddingRight: 10 }}>
                <View style={styles.signatureBox}></View>
                <Text style={styles.signatureLabel}>ASSINATURA</Text>
            </View>
            <View style={{ width: '50%' }}>
                <View style={styles.signatureBox}>
                    <Text style={{ textAlign: 'center', paddingTop: 5, fontSize: 10 }}>{formData.matriculaRecebedor}</Text>
                </View>
                <Text style={styles.signatureLabel}>MATRÍCULA:</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default RequisicaoAlmoxarifadoPdf;