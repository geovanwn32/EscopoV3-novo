# Análise do Módulo: Dashboard

## 1. Visão Geral
O módulo Dashboard funciona como a tela inicial e centro de inteligência do sistema, agregando dados de diversas fontes (Financeiro, Fiscal, RH) para apresentar indicadores chave de performance (KPIs). Atualmente, ele realiza cálculos pesados no lado do cliente (browser) baseados em todo o dataset carregado em memória via `DataContext`.

## 2. Erros e Pontos de Atenção Encontrados

### A. Lógica Hardcoded (Números Mágicos)
Existem cálculos críticos baseados em estimativas fixas que não refletem a realidade de todas as empresas:
- **Tributos (Linha 63):** O sistema assume uma taxa fixa de **6%** (`inv.val * 0.06`) caso o valor do imposto não esteja explícito na nota. Isso está incorreto para empresas fora do Simples Nacional ou em faixas diferentes.
- **Folha de Pagamento (Linha 75):** O custo da folha é multiplicado por **1.6** (160%) para simular encargos. Esse multiplicador deve ser configurável, pois varia drasticamente entre regimes tributários.
- **Datas de Vencimento (Linha 174, 194):** As datas de vencimento do DAS (dia 20) e DCTFWeb (dia 15) estão fixas no código. Isso gera alertas falsos quando o dia cai em fim de semana ou feriado, onde o vencimento real é postergado.

### B. Duplicidade de Regras de Negócio
- O `Dashboard.tsx` (linhas 157-214) recria lógica de verificação de alertas que já existe parcialmente ou deveria existir no `DataContext.tsx` (engine de notificações). Isso causa inconsistência e manutenção dupla.
- O Dashboard calcula seus próprios alertas locais ("Radar Fiscal") independentes da central de notificações global.

### C. Performance e Escalabilidade
- O Dashboard depende do `useData` que carrega **todas** as notas fiscais e movimentações do banco de dados para a memória. Conforme o cliente emitir mais notas (milhares), o Dashboard ficará lento ou travará o navegador, pois reprocessa tudo a cada renderização (loops `forEach` dentro de `useMemo`).

### D. Tipagem e Qualidade de Código
- Uso de `any` no componente `StatCard` (linha 10).
- Falta de validação robusta para dados nulos ou indefinidos em alguns cálculos de redução.

## 3. Aprimoramentos Sugeridos (Imediatos)

1.  **Centralização de Configurações Fiscais:**
    *   Criar configurações na entidade `Company` para armazenar: `% Alíquota Estimada`, `Fator de Encargos Folha` (ex: 1.6), e `Regime Tributário`.
    *   Utilizar esses valores nos cálculos em vez de 0.06 e 1.6.

2.  **Date Picker e Filtros:**
    *   Adicionar um seletor de período (Mês Atual, Trimestre, Ano, Personalizado). Atualmente o gráfico é fixo nos últimos 6 meses.

3.  **Interatividade (Drill-down):**
    *   Tornar os Cards clicáveis. Ao clicar em "Receita Operacional", o usuário deve ser redirecionado para a tela de **Notas Fiscais** com os filtros do período já aplicados.

4.  **Correção do Calendário Fiscal:**
    *   Implementar função utilitária `getNextBusinessDay(date)` para calcular vencimentos reais, evitando alertas de "Atrasado" em finais de semana.

## 4. Desenvolvimento para Tornar "Completo e Funcional"

### A. Fluxo de Caixa Projetado (Cash Flow Forecast)
Atualmente o gráfico mostra apenas o realizado (passado).
*   **Novo Recurso:** Adicionar linhas pontilhadas no gráfico projetando os próximos 3 meses baseando-se nas "Contas a Pagar" e "Contas a Receber" em aberto, além de médias recorrentes (ex: folha de pagamento).

### B. Widget de DRE Resumida
Adicionar um card que mostre uma mini-DRE (Demonstração do Resultado do Exercício) dinâmica:
*   (+) Receita Bruta
*   (-) Impostos
*   (-) Custos Variáveis
*   (=) Margem de Contribuição

### C. Analise por Centro de Custos
Se o sistema já suporta "Centros de Custo" (visto no Contexto), o Dashboard deveria permitir filtrar a visão por um centro específico (ex: ver apenas o resultado da "Matriz" ou "Filial X").

### D. Exportação de Relatório Executivo
Adicionar botão "Exportar PDF" que gera um relatório visual da tela atual para envio à diretoria/clientes.
