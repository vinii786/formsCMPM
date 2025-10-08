// src/pdf/SolicitacaoViagemPdf.tsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// ... (interface FormData e Participante continuam as mesmas)
interface Participante {
  id: number;
  nome: string;
}
interface FormData {
  nome: string;
  matricula: string;
  cargo: string;
  banco: string;
  agencia: string;
  conta: string;
  pix: string;
  numVereadores: string;
  numServidores: string;
  finalidade: "encontro" | "curso" | "outros";
  finalidadeOutros: string;
  periodo: string;
  cidadeEstado: string;
  local: string;
  meioTransporte: string;
  justificativa: string;
}


const styles = StyleSheet.create({
  // Adicionado estilo para o texto de teste
  debugText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 40, color: "#333" },
  header: { textAlign: "center", marginBottom: 15 },
  bold: { fontFamily: "Helvetica-Bold" },
  headerText: { fontSize: 9, color: "grey", lineHeight: 1.3 },
  introText: { fontSize: 10, textAlign: "justify", lineHeight: 1.5, marginBottom: 10 },
  section: { borderWidth: 1, borderColor: "#000", marginBottom: 10 },
  sectionTitle: { padding: 4, backgroundColor: "#E0E0E0", fontFamily: "Helvetica-Bold", fontSize: 11, borderBottomWidth: 1, borderBottomColor: "#000" },
  content: { padding: 8 },
  contentFinalidade: { padding: 8, display: "flex", flexDirection: "row", gap: 10 },
  row: { flexDirection: "row", marginBottom: 0, gap: 5 },
  col: { flex: 1, paddingRight: 10 },
  fieldContainer: { borderWidth: 1, borderColor: '#ccc', padding: 4, flexGrow: 1, marginBottom: 5 },
  fieldLabel: { fontSize: 7, fontFamily: "Helvetica-Bold", marginBottom: 2, color: '#555' },
  fieldValue: { fontSize: 9, borderBottomWidth: 1, borderBottomStyle: "dotted", borderBottomColor: "#000", paddingBottom: 2, minHeight: 12 },
  fieldValueSolicitante: { fontSize: 9, minHeight: 12, paddingBottom: 2 },
  table: { display: "flex", flexDirection: "column", width: "100%", borderWidth: 1, borderColor: "#000", marginTop: 10 },
  tableHeader: { flexDirection: "row", backgroundColor: "#E0E0E0", borderBottomWidth: 1, borderBottomColor: "#000" },
  tableRow: { flexDirection: "row" },
  tableColHeader: { flex: 1, borderRightWidth: 1, borderRightColor: "#000", padding: 4, fontFamily: "Helvetica-Bold", textAlign: "center", fontSize: 9 },
  tableCol: { flex: 1, borderRightWidth: 1, borderRightColor: "#000", padding: 4, minHeight: 20 },
  footerText: { fontSize: 8, marginTop: 5, fontStyle: "italic" },
  signatureSection: { marginTop: 25, alignItems: "center" },
  signatureLine: { borderBottomWidth: 1, borderBottomColor: "#000", width: "60%" },
  signatureText: { fontSize: 9, marginTop: 3 },
});

const SolicitacaoViagemPdf = ({
  formData,
  participantes,
}: {
  formData: FormData; 
  participantes: Participante[];
}) => {
  const currentDate = new Date();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* TEXTO DE TESTE ADICIONADO AQUI */}
        <Text style={styles.debugText}>
          TESTE DE ATUALIZAÇÃO: {currentDate.toLocaleString('pt-BR')}
        </Text>

        <View style={styles.header}>
            {/* ... o resto do seu header ... */}
        </View>
        
        {/* ... o resto do seu código ... */}

      </Page>
    </Document>
  );
};

export default SolicitacaoViagemPdf;