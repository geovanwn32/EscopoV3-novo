# Manual do Usuário - EscopoV3

Este manual fornece instruções passo a passo para utilizar as principais funcionalidades do sistema EscopoV3.

## Índice
1. [Acesso e Login](#1-acesso-e-login)
2. [Gestão Fiscal (Notas e Impostos)](#2-gestão-fiscal)
3. [Gestão Financeira](#3-gestão-financeira)
4. [Recursos Humanos (Folha)](#4-recursos-humanos)
5. [Configurações e Suporte](#5-configurações-e-suporte)

---

## 1. Acesso e Login

Para acessar o sistema:
1.  Abra o navegador e acesse o endereço do sistema.
2.  Insira seu **E-mail** e **Senha** cadastrados.
3.  Caso seja seu primeiro acesso, solicite credenciais ao Administrador.

**Dica**: Se você esquecer sua senha, solicite a redefinição na tela de login (funcionalidade depende de configuração de e-mail).

---

## 2. Gestão Fiscal

O módulo fiscal é o coração do escritório. Aqui você gerencia todas as notas fiscais e apura os impostos.

### Importar Notas Fiscais (XML)
1.  Vá para o menu **Fiscal** > Aba "Notas Fiscais".
2.  Clique no botão **"Importar XML"** (ícone de Upload).
3.  Selecione os arquivos `.xml` do seu computador. Você pode selecionar vários de uma vez.
4.  O sistema processará os arquivos e indicará o sucesso ou falha (ex: nota duplicada).

### Gerar SPED Fiscal
1.  Vá para o menu **Livros Fiscais** > Aba "SPED Fiscal".
2.  Verifique o período (mês/ano) e a empresa selecionada.
3.  O sistema listará automaticamente as notas do período.
4.  Clique em **"Gerar Arquivo SPED"**. O download do arquivo `.txt` iniciará automaticamente.
5.  Valide este arquivo no PVA da Receita Federal.

---

## 3. Gestão Financeira

Controle o fluxo de caixa da empresa.

### Conciliação Bancária
1.  Acesse o menu **Financeiro**.
2.  Clique em **"Importar OFX"**.
3.  Faça o upload do extrato bancário (arquivo `.ofx`) fornecido pelo banco.
4.  O sistema comparará as transações do extrato com os lançamentos já existentes no sistema.
5.  Confirme as conciliações sugeridas ou crie novos lançamentos com um clique.

### Relatórios DRE
1.  Acesse o menu **Relatórios**.
2.  Selecione a aba **DRE**.
3.  Defina o período desejado e clique em "Gerar Dados".
4.  O sistema exibirá a Demonstração do Resultado do Exercício, mostrando Receita Bruta, Impostos, Custos e Lucro Líquido.

---

## 4. Recursos Humanos

Gerencie colaboradores e folha de pagamento.

### Cadastrar Funcionário
1.  Vá para o menu **Cadastros** > Aba "Funcionários".
2.  Clique em **"Novo Cadastro"**.
3.  Preencha os dados obrigatórios: Nome, CPF, Cargo, Salário e Data de Admissão.

### Gerar Folha de Pagamento
1.  Acesse o menu **Folha Pagamento**.
2.  Selecione a competência (mês/ano).
3.  O sistema calculará automaticamente o salário líquido, descontos de INSS e IRRF baseados nas tabelas vigentes.
4.  Clique em "Exportar Folha" para gerar relatórios em PDF ou arquivo de integração.

---

## 5. Configurações e Suporte

### Trocar de Empresa
Se você gerencia múltiplas empresas:
1.  No topo da tela, clique no nome da empresa atual ou no ícone de "Troca" (setas).
2.  Selecione a empresa desejada na lista.

### Suporte Técnico
Encontrou um erro ou tem dúvidas?
1.  Vá para o menu **Ajuda**.
2.  Consulte o "FAQ" (Perguntas Frequentes).
3.  Se não resolver, utilize o formulário "Abrir Chamado" para contatar o suporte técnico de TI.

---
*EscopoV3 - Documentação Versão 1.0 (2026)*
