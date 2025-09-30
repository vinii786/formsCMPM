import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface FormData {
  nome: string;
  endereco: string;
  celular: string;
  identidade: string;
  matricula: string;
  lotacao: string;
  emailServidor: string;
  cpf: string;
  cargo: string;
  ramal: string;
  funcaoConfianca: "sim" | "nao";
  tipoFuncao: "direcao" | "gratificada" | "nenhum";
  qualFuncao: string;
  descricaoCurso: string;
  fornecedor: string;
  cnpj: string;
  contato: string;
  whatsapp: string;
  emailFornecedor: string;
  periodoRealizacao: string;
  inicioTermino: string;
  cargaHorariaTotal: string;
  cargaHorariaDiaria: string;
  usoProgressao: "sim" | "nao";
  formaApresentacao: string;
  solicitaInscricao: "sim" | "nao";
  valorInscricao: string;
  solicitaMensalidade: "sim" | "nao";
  valorMensalidade: string;
  valorTotal: string;
}

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 40, color: "#000" },
  title: {
    fontSize: 11,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    marginBottom: 15,
  },
  section: { border: "1px solid #000", marginBottom: 10 },
  sectionTitle: {
    padding: 4,
    backgroundColor: "#E0E0E0",
    fontFamily: "Helvetica-Bold",
    borderBottom: "1px solid #000",
    fontSize: 11,
  },
  content: { padding: 8 },
  row: { flexDirection: "row", marginBottom: 8 },
  col: { flex: 1, paddingRight: 10 },
  fieldLabel: { fontSize: 8, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  fieldValue: {
    fontSize: 10,
    borderBottom: "1px dotted #000",
    paddingBottom: 2,
    paddingRight: 2,
    minHeight: 12,
  },
  parecerBox: {
    border: "1px solid #000",
    height: 150,
    marginTop: 5,
    padding: 5,
  },
  signatureBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  signatureLine: { borderBottom: "1px solid #000", width: 180 },
  signatureText: { fontSize: 9, marginTop: 3, textAlign: "center" },
});

const SolicitacaoCursosPdf = ({ formData }: { formData: FormData }) => {
  const currentDate = new Date();

  return (
    <Document>
      {/* PÁGINA 1 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          FORMULÁRIO DE SOLICITAÇÃO DE APOIO A INICIATIVAS DE CAPACITAÇÃO CURSOS
          DE CURTA E MÉDIA DURAÇÃO - VERSÃO 2
        </Text>

        {/* Seção I */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I - IDENTIFICAÇÃO DO SERVIDOR</Text>
          <View style={styles.content}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Nome:</Text>
                <Text style={styles.fieldValue}>{formData.nome}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Matrícula:</Text>
                <Text style={styles.fieldValue}>{formData.matricula}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Endereço:</Text>
                <Text style={styles.fieldValue}>{formData.endereco}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Lotação:</Text>
                <Text style={styles.fieldValue}>{formData.lotacao}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Celular:</Text>
                <Text style={styles.fieldValue}>{formData.celular}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>CPF:</Text>
                <Text style={styles.fieldValue}>{formData.cpf}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Identidade:</Text>
                <Text style={styles.fieldValue}>{formData.identidade}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Cargo:</Text>
                <Text style={styles.fieldValue}>{formData.cargo}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Email:</Text>
                <Text style={styles.fieldValue}>{formData.emailServidor}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Ramal:</Text>
                <Text style={styles.fieldValue}>{formData.ramal}</Text>
              </View>
            </View>
            <Text>
              Função de Confiança:{" "}
              {formData.funcaoConfianca === "sim" ? "[X] Sim" : "[ ] Sim"}
              {"   "}
              {formData.funcaoConfianca === "nao" ? "[X] Não" : "[ ] Não"}
            </Text>
            {formData.funcaoConfianca === "sim" && (
              <Text style={{ fontSize: 9, marginTop: 4 }}>
                Tipo:{" "}
                {formData.tipoFuncao === "direcao"
                  ? "[X] Cargo de Direção"
                  : "[ ] Cargo de Direção"}
                {"   "}
                {formData.tipoFuncao === "gratificada"
                  ? "[X] Função Gratificada"
                  : "[ ] Função Gratificada"}{" "}
                | Qual? {formData.qualFuncao}
              </Text>
            )}
          </View>
        </View>

        {/* Seção II */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II - IDENTIFICAÇÃO DO CURSO</Text>
          <View style={styles.content}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Descrição do Curso:</Text>
                <Text style={styles.fieldValue}>{formData.descricaoCurso}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Dados do Fornecedor:</Text>
                <Text style={styles.fieldValue}>{formData.fornecedor}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>CNPJ:</Text>
                <Text style={styles.fieldValue}>{formData.cnpj}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Contato:</Text>
                <Text style={styles.fieldValue}>{formData.contato}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>WHATSAPP:</Text>
                <Text style={styles.fieldValue}>{formData.whatsapp}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>E-mail:</Text>
                <Text style={styles.fieldValue}>
                  {formData.emailFornecedor}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Início/Término:</Text>
                <Text style={styles.fieldValue}>{formData.inicioTermino}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Carga horária total:</Text>
                <Text style={styles.fieldValue}>
                  {formData.cargaHorariaTotal}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Carga horária diária:</Text>
                <Text style={styles.fieldValue}>
                  {formData.cargaHorariaDiaria}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>
                  Forma de apresentação (presencial, gravada ou on line):
                </Text>
                <Text style={styles.fieldValue}>
                  {formData.formaApresentacao}
                </Text>
              </View>
            </View>
            <Text>
              Utilização da capacitação para fins de progressão na carreira
              profissional?{" "}
              {formData.usoProgressao === "sim" ? "[X] sim" : "[ ] sim"}
              {"   "}
              {formData.usoProgressao === "nao" ? "[X] não" : "[ ] não"}
            </Text>
          </View>
        </View>

        {/* Seção III */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            III - APOIO FINANCEIRO SOLICITADO
          </Text>
          <View style={styles.content}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text>
                  Inscrição:{" "}
                  {formData.solicitaInscricao === "sim" ? "[X] Sim" : "[ ] Sim"}
                  {"   "}
                  {formData.solicitaInscricao === "nao" ? "[X] Não" : "[ ] Não"}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Valor:</Text>
                <Text style={styles.fieldValue}>
                  R$ {formData.valorInscricao}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text>
                  Mensalidade:{" "}
                  {formData.solicitaMensalidade === "sim"
                    ? "[X] Sim"
                    : "[ ] Sim"}
                  {"   "}
                  {formData.solicitaMensalidade === "nao"
                    ? "[X] Não"
                    : "[ ] Não"}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.fieldLabel}>Valor por mês:</Text>
                <Text style={styles.fieldValue}>
                  R$ {formData.valorMensalidade}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Valor Total do Curso:</Text>
                <Text style={styles.fieldValue}>R$ {formData.valorTotal}</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{ textAlign: "center", marginTop: 40, alignItems: "center" }}
        >
          <View
            style={{ width: "60%", borderTop: "1px solid #000", paddingTop: 3 }}
          >
            <Text>Assinatura do Servidor Participante</Text>
          </View>
          <Text style={{ marginTop: 15 }}>
            Patos de Minas, {currentDate.toLocaleDateString("pt-BR")}
          </Text>
        </View>
      </Page>

      {/* PÁGINA 2 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          FORMULÁRIO DE SOLICITAÇÃO DE APOIO A INICIATIVAS DE CAPACITAÇÃO CURSOS
          DE CURTA E MÉDIA DURAÇÃO - VERSÃO 2
        </Text>
        <View style={{ ...styles.section, marginTop: 20 }}>
          <Text style={styles.sectionTitle}>
            PARECER FUNDAMENTADO DO(A) SUPERIOR(A) IMEDIATO (A)
          </Text>
          <View style={styles.parecerBox} />
          <View style={styles.signatureBlock}>
            <Text>DATA: ____/____/______</Text>
            <Text>( ) DEFERIDO ( ) INDEFERIDO</Text>
            <View style={{ alignItems: "center" }}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>ASSINATURA</Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.section, marginTop: 20 }}>
          <Text style={styles.sectionTitle}>
            PARECER FUNDAMENTADO DO(A) DIRETOR(A) GERAL
          </Text>
          <View style={styles.parecerBox} />
          <View style={styles.signatureBlock}>
            <Text>DATA: ____/____/______</Text>
            <Text>( ) DEFERIDO ( ) INDEFERIDO</Text>
            <View style={{ alignItems: "center" }}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>ASSINATURA</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SolicitacaoCursosPdf;
