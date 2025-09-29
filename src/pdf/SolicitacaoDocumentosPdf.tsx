// src/pdf/SolicitacaoDocumentosPdf.tsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface FormData {
  nome: string;
  cpf: string;
  email: string;
  contato: string;
  documentosSolicitados: string;
  justificativa: string;
  cienteLgpd: boolean;
}

// Estilos ultra-seguros, sem nenhuma propriedade 'border'
const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 50, color: "#333" },
  header: { textAlign: "center", marginBottom: 10 },
  bold: { fontFamily: "Helvetica-Bold" },
  headerText: { fontSize: 9, color: "grey", lineHeight: 1.3 },
  title: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    textDecoration: "underline",
    margin: "20px 0",
  },

  sectionTitle: {
    padding: 4,
    backgroundColor: "#E0E0E0",
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  fieldValue: {
    fontSize: 10,
    paddingTop: 2,
  },
  textAreaValue: {
    minHeight: 60,
    padding: 4,
    marginTop: 2,
    fontSize: 9,
  },
  declarationText: {
    fontSize: 8,
    textAlign: "justify",
    lineHeight: 1.4,
    marginTop: 5,
  },
  obsTitle: {
    fontFamily: "Helvetica-Bold",
    textDecoration: "underline",
    marginBottom: 5,
    marginTop: 20,
  },
  signatureSection: { marginTop: 40, alignItems: "center" },
  signatureText: { fontSize: 10, marginTop: 3 },
});

const SolicitacaoDocumentosPdf = ({ formData }: { formData: FormData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.bold}>CÂMARA MUNICIPAL DE PATOS DE MINAS</Text>
          <Text style={styles.headerText}>
            Rua José de Santana, 470, Céntro - CEP: 38700-052-Patos de Minas -
            MG
          </Text>
          <Text style={styles.headerText}>
            Tel: (34) 3821-8455-camarapatos@camarapatos.mg.gov.br -
            www.camarapatos.mg.gov.br
          </Text>
        </View>

        <Text style={styles.title}>
          SOLICITAÇÃO DE PASTA FUNCIONAL E/OU DOCUMENTO
        </Text>

        <Text style={styles.sectionTitle}>IDENTIFICAÇÃO DO SOLICITANTE</Text>
        <View style={{ paddingHorizontal: 8 }}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>NOME:</Text>
            <Text style={styles.fieldValue}>
              {formData.nome ||
                "...................................................................................."}
            </Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>CPF:</Text>
            <Text style={styles.fieldValue}>
              {formData.cpf ||
                "...................................................................................."}
            </Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>E-MAIL:</Text>
            <Text style={styles.fieldValue}>
              {formData.email ||
                "...................................................................................."}
            </Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>CONTATO:</Text>
            <Text style={styles.fieldValue}>
              {formData.contato ||
                "...................................................................................."}
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 9, marginTop: 15 }}>
          Venho, por meio deste, requerer cópia dos seguintes documentos
          constantes da Divisão de Recursos Humanos
        </Text>

        <Text style={styles.sectionTitle}>DADOS DA SOLICITAÇÃO</Text>
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={styles.fieldLabel}>
            Descrever os documentos solicitados - (ex: ficha funcional, termo de
            posse, etc).
          </Text>
          <Text style={styles.textAreaValue}>
            {formData.documentosSolicitados || " "}
          </Text>

          <Text style={{ marginTop: 15, fontSize: 9, lineHeight: 1.3 }}>
            {formData.cienteLgpd ? "[X]" : "[ ]"} Declaro estar ciente da Lei nº
            13.709, de 14 de agosto de 2018 - Lei Geral de Proteção de Dados
            Pessoais (LGPD).
          </Text>

          <Text style={{ ...styles.fieldLabel, marginTop: 15 }}>
            Justificativa do pedido de cópia:
          </Text>
          <Text style={styles.textAreaValue}>
            {formData.justificativa || " "}
          </Text>
        </View>

        <View>
          <Text style={styles.obsTitle}>OBSERVAÇÕES</Text>
          <Text style={styles.declarationText}>
            Obs 1: Como regra, os documentos arquivados na Divisão de Recursos
            Humanos somente poderão ter suas cópias fornecidas aos titulares ou
            partes diretamente interessadas, resguardando-se o direito à
            privacidade previsto em lei.
          </Text>
          <Text style={styles.declarationText}>
            Obs 2: A solicitação por terceiros deverá ser fundamentada, por
            escrito, com a justificativa do legítimo interesse, contendo
            identificação completa do requerente, ficando sujeita à análise e
            aprovação da autoridade competente.
          </Text>
          <Text style={styles.declarationText}>
            Obs 3: As solicitações de assentamentos funcionais, bem como os
            documentos ou suas respectivas digitalizações, serão fornecidas
            diretamente ao solicitante, observando-se o prazo máximo de três
            dias úteis, podendo ser atendidas em prazo menor, de acordo com a
            demanda do setor.
          </Text>
        </View>

        <Text style={{ textAlign: "center", marginTop: 30 }}>
          Patos de Minas, ______ de ___________________ de _______.
        </Text>

        <View style={styles.signatureSection}>
          <Text>____________________________________________________</Text>
          <Text style={styles.signatureText}>Assinatura do Requerente</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SolicitacaoDocumentosPdf;
