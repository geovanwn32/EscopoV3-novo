# Plano de Implementação: Automação Total do EscopoV3

Este plano detalha as etapas para transformar o EscopoV3 em um sistema totalmente automatizado, cobrindo ingestão, processamento, notificações e manutenção.

## 1. Hotfolders (Monitoramento de Pastas)
**Objetivo**: Eliminar o upload manual de arquivos XML e OFX.
- **Tecnologia**: `chokidar` (Biblioteca de monitoramento de arquivos robusta).
- **Implementação**:
    - Criar serviço `electron/services/fileWatcher.ts`.
    - Monitorar pastas padrão (ex: `Documents/EscopoV3/Entrada`).
    - Detectar arquivos novos -> Identificar tipo (XML NFe ou OFX) -> Processar -> Mover para pasta "Processados".
    - Enviar sinal ao Frontend via IPC para atualizar a UI.

## 2. Agendador de Tarefas (Cron Jobs)
**Objetivo**: Executar rotinas de manutenção e fechamento sem intervenção humana.
- **Tecnologia**: `node-cron`.
- **Rotinas**:
    - **Backup Diário**: 12:00 e 18:00.
    - **Fechamento Fiscal**: 23:59 (Verificar notas do dia e gerar prévia).
    - **Monitor de Prazos**: 08:00 (Verificar impostos vencendo e criar alertas).

## 3. Classificação Inteligente (Auto-Conciliação)
**Objetivo**: Reduzir a necessidade de classificar transações repetitivas.
- **Lógica**:
    - Persistir regras de "De-Para" no banco de dados (`learning_rules`).
    - Ao importar OFX, verificar: `Se descrição contém "X", classificar como "Categoria Y"`.
    - Interface para o usuário treinar o sistema (Aprovar/Rejeitar sugestões).

## 4. Notificações Automáticas
**Objetivo**: Informar clientes e usuários sobre eventos críticos.
- **Tecnologia**: `nodemailer` (E-mail).
- **Implementação**:
    - Serviço de envio de e-mails transacionais.
    - Gatilhos: "Guia Gerada", "Folha de Pagamento Disponível", "Alerta de Vencimento".

## 5. Auto-Update (DevOps)
**Objetivo**: Manter o software sempre atualizado.
- **Tecnologia**: `electron-updater`.
- **Implementação**:
    - Configurar verificação de atualizações na inicialização do app.
    - Download e instalação silenciosa.

---

## Ordem de Execução

1.  **Instalação de Dependências**: Adicionar pacotes necessários.
2.  **Infraestrutura Electron**: Preparar `main.ts` para carregar serviços em segundo plano.
3.  **Implementação Hotfolders**: Criar o watcher e lógica de ingestão.
4.  **Implementação Scheduler**: Configurar Cron Jobs.
5.  **Atualização da UI**: Adicionar configurações para o usuário definir pastas e preferências.
