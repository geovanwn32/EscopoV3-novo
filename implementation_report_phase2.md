# Relatório de Implementação - Fase 2: Motor Fiscal Real

## Objetivo
Profissionalizar o cálculo de impostos do Simples Nacional, substituindo a lógica simplificada (taxa fixa) por um motor de cálculo real que considera o faturamento acumulado (RBT12), anexo da empresa e faixas de alíquota progressivas, conforme a Lei Complementar nº 123/2006.

## Alterações Realizadas

### 1. Novo Cálculo de RBT12 (Receita Bruta Total - 12 Meses)
Implementamos a função `calculateRBT12` em `utils/accountingAutomations.ts`.
- **Lógica:** Soma o valor de todas as notas fiscais (Vendas e Serviços) emitidas nos 12 meses anteriores ao período de apuração.
- **Filtros:** Considera apenas notas válidas (não canceladas) e pertencentes à empresa selecionada.

### 2. Integração com Tabela de Anexos
- O fechamento contábil agora consome as tabelas oficiais (`SIMPLES_ANNEXES`) definidas em `utils/fiscalCalculations.ts`.
- A função `calculateComplexDas` é utilizada para determinar a alíquota efetiva baseada na faixa de faturamento e no RBT12 calculado.

### 3. Melhoria nas Provisões Contábeis
Expandimos a geração automática de lançamentos contábeis (`generateJournalEntries` / `generateClosingEntries`) para incluir:
- **Impostos:** Cálculo exato do DAS a recolher e provisão redutora de receita.
- **Trabalhista:** Além dos salários, agora provisionamos automaticamente:
  - FGTS (8%)
  - Férias (+ 1/3)
  - 13º Salário (1/12 por mês)

### 4. Refatoração de Código
- Atualizada a assinatura de `generateClosingEntries` para receber o objeto `CompanyEntity` completo, permitindo acesso ao `anexoSimples` e `regimeTributario` da empresa.
- Ajustada a chamada da função na página `Accounting.tsx`.

## Próximos Passos Sugeridos

1.  **Assinatura Digital (A1):** Implementar a assinatura XML local para permitir o envio real de eventos ao eSocial sem depender de proxies externos inseguros.
2.  **Transações Atômicas:** Refatorar `DataContext.ts` para usar `runTransaction` do Firestore ao baixar notas e gerar financeiro, evitando inconsistências.
3.  **Segurança (RBAC):** Refinar as permissões de usuário para desabilitar botões críticos para usuários não-administradores.

## Conclusão
O sistema agora possui um "cérebro" fiscal capaz de calcular impostos com precisão legal, deixando de ser um protótipo e se tornando uma ferramenta de gestão contábil viável.
