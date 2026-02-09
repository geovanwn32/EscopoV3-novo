# Análise do Módulo: Impostos (Taxes)

## 1. Visão Geral
O módulo Central de Impostos centraliza a apuração do Simples Nacional (DAS), impostos sobre a folha e análise de recuperação de créditos. A interface é intuitiva e separa bem as diferentes obrigações.

## 2. Pontos Críticos Identificados

### A. Repartição Tributária Estática (Simples Nacional)
No arquivo `Taxes.tsx`, a distribuição dos impostos dentro do DAS (quanto vai para CPP, ICMS, ISS, etc.) utiliza porcentagens fixas por Anexo (ex: Anexo III sempre considera 33.5% para ISS).
*   **Problema:** Na legislação do Simples Nacional, essa repartição varia conforme a **faixa de faturamento** (1ª a 5ª faixa). Usar um valor fixo gera guias de partilha incorretas para a contabilidade, embora o valor total da guia possa estar próximo do real se a alíquota efetiva estiver correta.
*   **Correção Necessária:** Implementar a tabela completa de partilha por faixa (Anexos I a V da LC 123/2006) ou permitir que o usuário configure as alíquotas de partilha se não houver cálculo automático preciso.

### B. Lista de Monofásicos Limitada (Hardcoded)
A detecção de produtos monofásicos (PIS/COFINS zero) baseia-se em uma lista fixa (`MONOFASICO_NCMS`) no código, contendo apenas alguns exemplos (Bebidas, Pneus, Autopeças).
*   **Problema:** Muitos produtos reais deixarão de ser identificados, perdendo oportunidades de economia tributária.
*   **Correção:** Expandir a lista ou mover para um arquivo de configuração/banco de dados editável pelo usuário.

### C. Estimativa de Folha Simplificada
O cálculo de encargos (INSS/FGTS) quando não há folha fechada usa alíquotas fixas (ex: 11% INSS patronal simplificado, ou descontos de IRRF simplificados).
*   **Impacto:** Pode gerar previsões de fluxo de caixa distorcidas para empresas com muitos funcionários em faixas salariais variadas.

## 3. Sugestões de Melhoria (Roadmap)

1.  **Motor de Cálculo Oficial:**
    *   Substituir/Refinar a função `calculateComplexDas` para considerar exatamente as faixas de faturamento e deduções legais oficiais de 2024/2025.
2.  **Configuração de Tributos:**
    *   Permitir que o usuário edite a lista de NCMs Monofásicos na aba de configurações.
3.  **Dashboard de Inteligência:**
    *   Adicionar um gráfico comparando a carga tributária "Simples Nacional" vs. "Lucro Presumido" para auxiliar no planejamento tributário anual.
