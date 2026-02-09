# Análise do Módulo: Estoque (Inventory)

## 1. Visão Geral
O módulo de Estoque é central para a operação comercial, integrando-se com o Fiscal e o Financeiro. A interface é moderna e exibe KPIs relevantes. O sistema utiliza um cálculo dinâmico baseado no histórico de notas fiscais para determinar o saldo atual.

## 2. Pontos Críticos Identificados

### A. Produtos "Invisíveis"
O loop principal de cálculo (`useMemo` Linha 103) itera apenas sobre **Notas Fiscais (`invoices`)**.
*   **Problema:** Se você cadastrar um Produto novo manualmente (ex: "Parafuso A" com Saldo Inicial 100), ele **não aparecerá na lista** até que seja movimentado por uma nota fiscal.
*   **Correção:** O mapa de estoque deve ser inicializado com *todos* os produtos cadastrados no sistema, usando o campo `stock` do cadastro como saldo inicial.

### B. Cálculo de Custo (Valuation) impreciso
Atualmente, o custo do produto (`value`) é atualizado com o valor unitário da última nota processada no loop.
*   **Problema:** Isso ignora o conceito de **Custo Médio Ponderado**. Se comprei 10un a R$5 e depois 10un a R$10, o custo médio deveria ser R$7,50. O sistema atual assume R$10 (ou R$5 dependendo da ordem), distorcendo o valor total do ativo (KPI "Total em Ativos").
*   **Correção:** Implementar lógica de média ponderada a cada entrada (`entry`).

### C. Conflito: Saldo Inicial vs. Saldo Calculado
A ferramenta de edição permite alterar o "Saldo Inicial" (`formData.stock`), mas o sistema de cálculo reprocessa tudo baseando-se em notas.
*   **Risco:** O usuário pode editar o saldo para corrigir um furo de estoque, mas se a lógica de cálculo for estrita às notas, essa alteração pode ser perdida ou sobreposta visualmente.

## 3. Aprimoramentos Sugeridos (Imediatos)

1.  **Refatoração do Cálculo de Estoque:**
    *   Inverter a lógica: Iterar sobre `products` primeiro para garantir que todos apareçam.
    *   Considerar o campo `product.stock` como saldo de abertura (Saldo Anterior).

2.  **Custo Médio Ponderado:**
    *   Adicionar fórmula: `NovoCusto = ((QtdAtual * CustoAtual) + (QtdEntrada * PrecoEntrada)) / (QtdAtual + QtdEntrada)`.

3.  **Botão de Ajuste Rápido:**
    *   Ao criar ou editar um produto com saldo diferente de zero, o sistema deve idealmente gerar uma "Nota de Ajuste" interna transparente para manter a rastreabilidade, em vez de apenas mudar o número estático.

## 4. Próximos Passos
*   Implementar as correções de lógica no `useMemo` do `Inventory.tsx`.
*   Assegurar que o cadastro manual reflita imediatamente na grade.
