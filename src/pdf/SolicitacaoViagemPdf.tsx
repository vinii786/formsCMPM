// src/pdf/SolicitacaoViagemPdf.tsx
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface Participante {
  id: number;
  nome: string;
}

interface FormData {
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
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 40 },
  headerText: { fontSize: 9, textAlign: "center" },
  title: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    margin: "15px 0",
  },
  introText: {
    fontSize: 10,
    textAlign: "justify",
    lineHeight: 1.5,
    marginBottom: 10,
  },
  section: { marginBottom: 8 },
  sectionTitle: { fontFamily: "Helvetica-Bold", marginBottom: 4 },
  fieldValue: {
    borderBottom: "1px dotted #000",
    minHeight: 12,
    paddingLeft: 4,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    border: "1px solid #000",
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderBottom: "1px solid #000",
  },
  tableRow: { flexDirection: "row", borderBottom: "1px solid #000" },
  tableColHeader: {
    flex: 1,
    borderRight: "1px solid #000",
    padding: 4,
    fontFamily: "Helvetica-Bold",
  },
  tableCol: {
    flex: 1,
    borderRight: "1px solid #000",
    padding: 4,
    minHeight: 20,
  },
  footerText: { fontSize: 8, marginTop: 10 },
  signatureBlock: { marginTop: 30, alignItems: "center" },
  signatureLine: { borderBottom: "1px solid #000", width: "60%", marginTop: 2 },
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
        <Text style={{ fontFamily: "Helvetica-Bold", textAlign: "center" }}>
          CÂMARA MUNICIPAL DE PATOS DE MINAS
        </Text>
        <Text style={styles.headerText}>
          Rua José de Santana, 470, Centro CEP: 38700-052-Patos de Minas - MG
        </Text>
        <Text style={styles.headerText}>
          Tel: (34) 3821-8455-camarapatos@camarapatos.mg.gov.br -
          www.camarapatos.mg.gov.br
        </Text>
        <Text style={{ marginTop: 20, textAlign: "center", fontSize: 17 }}>
          Solicitação de Viagem
        </Text>
        <Text
          style={{ ...styles.introText, marginTop: 20, textAlign: "center" }}
        >
          EXCELENTÍSSIMO SENHOR PRESIDENTE DA CÂMARA MUNICIPAL DE PATOS DE MINAS
        </Text>
        <Text style={styles.introText}>
          Em atendimento ao disposto na Resolução nº 276/12, requeiro a Vossa
          Excelência autorização para desempenho de missão temporária, de
          caráter representativo ou cultural, a qual será custeada por diárias
          pagas pelo poder público.
        </Text>
        <Text style={styles.introText}>Para tanto, especifico o seguinte:</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            1. Quem participará da viagem:
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {" "}
            Vereador Nº de participantes: {formData.numVereadores}
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {" "}
            Servidor Nº de participantes: {formData.numServidores}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Finalidade:</Text>
          <Text style={{ marginLeft: 10 }}>
            [{formData.finalidade === "encontro" ? "X" : " "}]
            Encontro/Seminário/Congresso
          </Text>
          <Text style={{ marginLeft: 10 }}>
            [{formData.finalidade === "curso" ? "X" : " "}] Curso de
            aperfeiçoamento
          </Text>
          <Text style={{ marginLeft: 10 }}>
            [{formData.finalidade === "outros" ? "X" : " "}] Outros:{" "}
            <Text style={styles.fieldValue}>{formData.finalidadeOutros}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. Período:{" "}
            <Text style={styles.fieldValue}>{formData.periodo}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Destino:</Text>
          <Text style={{ marginLeft: 10 }}>
            a) Cidade e Estado:{" "}
            <Text style={styles.fieldValue}>{formData.cidadeEstado}</Text>
          </Text>
          <Text style={{ marginLeft: 10 }}>
            b) Local: <Text style={styles.fieldValue}>{formData.local}</Text>
          </Text>
          <Text style={{ marginLeft: 10 }}>
            c) Meio de transporte:{" "}
            <Text style={styles.fieldValue}>{formData.meioTransporte}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Justificativa:</Text>
          <Text style={styles.fieldValue}>{formData.justificativa}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableColHeader}>
              <Text>Participante(s)</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Assinatura(s) do Participante</Text>
            </View>
            <View style={{ ...styles.tableColHeader, borderRight: 0 }}>
              <Text>Assinatura(s) do Chefe Imediato*</Text>
            </View>
          </View>
          {participantes.map((p) => (
            <View key={p.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>{p.nome}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text> </Text>
              </View>
              <View style={{ ...styles.tableCol, borderRight: 0 }}>
                <Text> </Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.footerText}>
          *A assinatura do Chefe Imediato certifica que não haverá prejuízo dos
          trabalhos no setor em que o servidor está lotado.
        </Text>

        <Text style={{ ...styles.footerText, textAlign: "right" }}>
          Patos de Minas,{" "}
          {currentDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          .
        </Text>

        <View style={styles.signatureBlock}>
          <Text style={styles.signatureLine}></Text>
          <Text style={{ fontSize: 8 }}>Divisão de Contabilidade</Text>
          <Text style={styles.footerText}>
            Declaro haver dotação orçamentária e financeira suficiente para
            fazer face ao requerimento.
          </Text>
        </View>

        <View style={styles.signatureBlock}>
          <Text style={styles.signatureLine}></Text>
          <Text style={{ fontSize: 8 }}>Presidente da Câmara Municipal</Text>
          <Text style={styles.footerText}>
            Fica autorizada a percepção de diárias de viagem conforme requerido.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default SolicitacaoViagemPdf;
