# Análise do Módulo: Fiscal

## 1. Visão Geral
O módulo Fiscal é responsável pela gestão de NFe (Produtos) e NFSe (Serviços), importação de XMLs, manifestação de destinatário e apuração de impostos. O código é robusto e já contém integração avançada com APIs de Sefaz (via proxy local), mas necessita de refinamentos para se alinhar com as novas configurações dinâmicas da empresa.

## 2. Erros e Pontos de Atenção Encontrados

### A. Integração com Taxas Dinâmicas (Company Settings)
O módulo ainda utiliza valores *hardcoded* que ignoram a configuração realizada na etapa anterior:
- **ISS Fixo:** Ao importar um XML de serviço, o sistema assume uma alíquota fixa de **5%** (Linha 947), ignorando a configuração `aliquotaISS` da empresa.
- **ICMS Padrão:** Assume **18%** como padrão para produtos com NCM (Linha 382/400).
- **Simples Nacional:** O sistema tenta calcular ICMS/IPI/PIS/COFINS detalhado mesmo se a empresa for do Simples Nacional, onde esses impostos deveriam ser zerados ou tratados de forma simplificada em campos específicos (CSOSN).

### B. Dependência de Backend Local
As funções de comunicação com a SEFAZ (`handleManifestInvoice`, `handleSefazCloudFetch`) estão apontando fixamente para `http://localhost:3000`.
- **Risco:** Isso quebrará em produção a menos que haja um sidecar/servidor local rodando na máquina do usuário. Se a arquitetura for Serverless/Firebase Functions, essas URLs devem ser atualizadas para variáveis de ambiente.

### C. Performance (Batch Import)
O processamento de múltiplos XMLs (`onFileChange`) é feito no loop principal (Main Thread). Se o usuário arrastar 50 XMLs de uma vez, a interface irá travar até o término.
- **Sugestão:** Mover o parsing de XML para um Web Worker ou usar `setTimeout` para desbloquear a UI entre arquivos.

### D. Falta de Filtros via URL (Drill-down)
A funcionalidade de "Drill-down" criada no Dashboard (clicar em "Faturamento" e ir para Fiscal) não funcionará como esperado porque o `Fiscal.tsx` não lê os parâmetros da URL para aplicar os filtros iniciais.

## 3. Aprimoramentos Sugeridos (Imediatos)

1.  **Refatoração do Cálculo de Impostos (`addItemToList` & `useEffect`):**
    *   Ler o `data.selectedCompany.regimeTributario`.
    *   Se for **Simples Nacional**: Zerar campos de IPI/PIS/COFINS por padrão e focar no CSOSN.
    *   Se for **Serviço**: Usar `data.selectedCompany.aliquotaISS` em vez de 5%.

2.  **Leitura de Filtros na URL:**
    *   Implementar `useSearchParams` para capturar `startDate`, `endDate` e `type` vindos do Dashboard, permitindo a navegação fluida entre módulos.

3.  **Tratamento de Erros SEFAZ:**
    *   Adicionar verificação se o servidor de proxy (localhost:3000) está acessível antes de tentar a requisição, evitando timeouts silenciosos ou erros genéricos na UI.

## 4. Desenvolvimento para Tornar "Completo e Funcional"

### A. Apuração Express (Simples Nacional)
Criar um botão "Gerar Apuração Mensal" que:
1.  Soma o faturamento do mês.
2.  Aplica a alíquota efetiva configurada na empresa.
3.  Gera o valor do DAS a pagar estimado.

### B. Livros Fiscais (Sugestão de Aba Extra)
Atualmente tudo é uma lista única. Adicionar uma visualização de "Livro de Entradas" e "Livro de Saídas" (layout tabular denso) facilitaria a conferência contábil tradicional.

### C. Validação de NCM
Integrar uma lista de NCMs válidos (ou API externa) para validar se o código importado do XML ainda existe na tabela TIPI atual.
