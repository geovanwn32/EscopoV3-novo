# Plano de Implementação: Profissionalização do Sistema EscopoV3

Este documento serve como roteiro mestre para a análise, correção e evolução do sistema, conforme solicitação técnica.

## 1. Análise Geral e Fundação (Concluída)
- [x] Leitura da estrutura de diretórios e arquivos principais.
- [x] Análise dos modelos de dados (`types.ts`).
- [x] Revisão da arquitetura de integração (Context API vs Banco de Dados).
- [x] Configuração de ferramentas de padronização (ESLint/Prettier se necessário).

## 2. Módulo Fiscal: Cálculos e Conformidade (Concluído)
*Objetivo: Tornar o cálculo do Simples Nacional e demais impostos compatível com a legislação vigente.*
- [x] **Evoluir `fiscalCalculations.ts`**:
    - [x] Implementar segregação de receitas (Mófasico, ST, Imune, Exportação).
    - [x] Implementar tabelas de partilha (percentuais de IRPJ, CSLL, etc. por faixa).
    - [x] Adicionar suporte a retenções de ISS.
- [x] **Atualizar `Taxes.tsx`**:
    - [x] Remover lógica "mock" e "sample".
    - [x] Integrar com o novo motor de cálculo.
    - [x] Melhorar UI/UX da tela de apuração (detalhamento dos impostos).
- [x] **Automação de Notas Fiscais**:
    - [x] Validar leitura de XMLs para classificar automaticamente produtos monofásicos (via NCM).
- [x] **Obrigações Acessórias (SPED)** (NOVO):
    - [x] Implementar gerador real do EFD ICMS/IPI (Blocos 0, C, 9).
    - [x] Criar UI de exportação (`SpedExport.tsx`) e integrar em `FiscalBooks.tsx`.

## 3. Módulo Contábil e Integração (Concluído)
*Objetivo: Garantir que o fiscal alimente a contabilidade automaticamente.*
- [x] Criar/Revisar módulo de "Lançamentos Contábeis".
- [x] Automatizar geração de lançamentos a partir das Notas (Venda/Compra) e da Folha.
- [x] Implementar "Plano de Contas" padronizado.

## 4. Módulo Trabalhista (Folha) (Concluído)
*Objetivo: Revisar cálculos de folha e encargos.*
- [x] Validar cálculos de INSS (faixas progressivas 2025).
- [x] Validar cálculos de IRRF (tabela progressiva).
- [x] Validar regras de FGTS.
- [x] Implementar base para geração de arquivos (S-1200, S-1210).

## 5. Módulo Financeiro e Conciliação (Concluído)
*Objetivo: Facilitar a gestão de fluxo de caixa.*
- [x] Revisar parser OFX (`bankParsers.ts`) para maior robustez com Regex.
- [x] Integrar importação de extrato com conciliação inteligente.

## 6. UI/UX e Padronização Visual
*Objetivo: Modernizar e padronizar a interface.*
- [x] Definir Design System no `tailwind.config.js`.
- [x] Criar componentes base reutilizáveis.
- [x] Implementar seletor de Tema (Dark/Light).

## 7. Gestão Administrativa e Segurança (Concluído)
*Objetivo: Controle de acesso e auditoria.*
- [x] Implementar cadastro de Usuários do Sistema.
- [x] Definir permissões básicas (Admin/Operador).
- [x] Melhorar log de Auditoria técnica.

## 8. Relatório Final e Documentação (Concluído)
- [x] Gerar documentação técnica das funções principais (`README.md`).
- [x] Compilar manual de uso e manutenção (`USER_MANUAL.md`).
- [x] Implementar página de Ajuda Interna (`Help.tsx`).

---
**Status Atual**: PROJETO FINALIZADO. Todos os módulos (Fiscal, Financeiro, RH, CRM, Docs, Admin) foram implementados e documentados. O sistema está pronto para deploy final e entrega.
