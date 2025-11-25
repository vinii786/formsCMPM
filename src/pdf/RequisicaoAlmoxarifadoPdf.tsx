// src/pdf/RequisicaoAlmoxarifadoPdf.tsx

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// 1. INTERFACES NECESSÁRIAS
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
}

interface Props {
  formData: FormData;
  itens: ItemRequisicao[];
}

// 2. ESTILOS COMPLETOS (COM CORREÇÃO PARA TIPAGEM DA TABELA)
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 10,
    },
    // --- Estilos de Layout Geral ---
    requisicaoData: { // Estilo para as caixas de dados
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
        padding: 5,
    },
    // --- Tabela de Itens (Corrigido para evitar 'display: table') ---
    table: { 
        display: 'flex', 
        flexDirection: 'column',
        width: 'auto',
        marginBottom: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        minHeight: 20,
    },
    // Headers da Tabela
    tableColHeader: { width: '10%', borderRightWidth: 1, borderRightColor: '#000', padding: 4, textAlign: 'center', backgroundColor: '#f0f0f0', fontWeight: 'bold' },
    tableColDescHeader: { width: '55%', borderRightWidth: 1, borderRightColor: '#000', padding: 4, textAlign: 'center', backgroundColor: '#f0f0f0', fontWeight: 'bold' },
    tableColQtdeHeader: { width: '17.5%', borderRightWidth: 1, borderRightColor: '#000', padding: 4, textAlign: 'center', backgroundColor: '#f0f0f0', fontWeight: 'bold' },
    tableColQtdeAtendHeader: { width: '17.5%', padding: 4, textAlign: 'center', backgroundColor: '#f0f0f0', fontWeight: 'bold' },
    // Conteúdo da Tabela
    tableCol: { width: '10%', borderRightColor: '#000', borderRightWidth: 1, padding: 4, textAlign: 'center' },
    tableColDesc: { width: '55%', borderRightColor: '#000', borderRightWidth: 1, padding: 4 },
    tableColQtde: { width: '17.5%', borderRightColor: '#000', borderRightWidth: 1, padding: 4, textAlign: 'center' },
    tableColQtdeAtend: { width: '17.5%', padding: 4, textAlign: 'center' },
    
    // --- Estilos para Recebimento/Entrega (Layout Manual) ---
    recebimentoSection: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 10,
    },
    dataRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        minHeight: 20,
        alignItems: 'flex-end',
        padding: 2,
    },
    dataLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        width: '35%',
    },
    dataValue: {
        fontSize: 9,
        width: '65%',
        borderBottomWidth: 1,
        borderBottomColor: '#000', // Linha para preenchimento manual
    },
    signatureRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    signatureCol: {
        width: '50%',
        textAlign: 'center',
        padding: 5,
        borderRightWidth: 1,
        borderRightColor: '#000', // Divisor vertical
    },
    matriculaCol: {
        width: '50%',
        textAlign: 'center',
        padding: 5,
    },
    signatureLine: {
        borderTopWidth: 1,
        borderTopColor: '#000',
        paddingTop: 2,
        marginTop: 20, // Espaço para a assinatura ser feita
        fontSize: 8,
        fontWeight: 'bold',
    },
});


const RequisicaoAlmoxarifadoPdf: React.FC<Props> = ({ formData, itens }) => {
    // Lógica para preencher as linhas da tabela
    const dataItens = itens.map((item, index) => (
        <View key={item.id} style={styles.tableRow} wrap={false}>
            <Text style={styles.tableCol}>{index + 1}</Text>
            <Text style={styles.tableColDesc}>{item.descricao}</Text>
            <Text style={styles.tableColQtde}>{item.quantidadeSolicitada}</Text>
            <Text style={styles.tableColQtdeAtend}>{item.quantidadeAtendida}</Text>
        </View>
    ));

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                
                {/* Cabeçalho */}
                <View style={{ marginBottom: 15, textAlign: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>CÂMARA MUNICIPAL DE PATOS DE MINAS</Text>
                    <Text style={{ fontSize: 11 }}>PROTOCOLO DE ENTREGA DE MATERIAIS DE CONSUMO</Text>
                    <Text style={{ fontSize: 9, marginTop: 5 }}>ANEXO I</Text>
                </View>

                {/* Dados da Requisição */}
                <View style={styles.requisicaoData}>
                    <Text style={{ fontSize: 10 }}>REQUISIÇÃO Nº: {formData.requisicaoNum} - DATA: {formData.dataEmissao}</Text>
                    <Text style={{ fontSize: 10, marginTop: 5 }}>REQUISITANTE: {formData.requisitante}</Text>
                    <Text style={{ fontSize: 10, marginTop: 5 }}>LOTAÇÃO: {formData.lotacao}</Text>
                </View>
                
                {/* Justificativa */}
                <View style={styles.requisicaoData}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold' }}>JUSTIFICATIVA:</Text>
                    <Text style={{ fontSize: 9, marginTop: 5 }}>{formData.justificativa}</Text>
                </View>


                {/* TABELA DE ITENS */}
                <View style={styles.table} wrap={true}>
                    {/* Header da Tabela */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>ITEM</Text>
                        <Text style={styles.tableColDescHeader}>DESCRIÇÃO</Text>
                        <Text style={styles.tableColQtdeHeader}>QTDE. SOLICITADA</Text>
                        <Text style={styles.tableColQtdeAtendHeader}>QTDE. ATENDIDA</Text>
                    </View>
                    {/* Linhas de Itens */}
                    {dataItens}
                </View>
                
                {/* DADOS RECEBIMENTO/ENTREGA (MANUAL) */}
                <View style={styles.recebimentoSection} wrap={false}>
                    {/* Rótulo principal */}
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#000', padding: 5 }}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>DADOS RECEBIMENTO/ENTREGA REQUISIÇÃO Nº: {formData.requisicaoNum}</Text>
                    </View>
                    
                    {/* Campos de texto com linha de preenchimento manual */}
                    <View style={styles.dataRow}>
                        <Text style={styles.dataLabel}>DATA RECEBIMENTO/ENTREGA:</Text>
                        <Text style={styles.dataValue}></Text> 
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.dataLabel}>ENTREGUE POR:</Text>
                        <Text style={styles.dataValue}></Text>
                    </View>
                    
                    <View style={styles.dataRow}>
                        <Text style={styles.dataLabel}>RECEBIDO POR:</Text>
                        <Text style={styles.dataValue}></Text>
                    </View>
                    
                    {/* Assinatura e Matrícula (Divisor vertical e linha horizontal) */}
                    <View style={styles.signatureRow}>
                        {/* Coluna da Assinatura */}
                        <View style={styles.signatureCol}>
                            <Text style={styles.signatureLine}>ASSINATURA</Text>
                        </View>
                        
                        {/* Coluna da Matrícula */}
                        <View style={styles.matriculaCol}>
                            <Text style={styles.signatureLine}>MATRÍCULA:</Text>
                        </View>
                    </View>
                </View>

            </Page>
        </Document>
    );
};

export default RequisicaoAlmoxarifadoPdf;