# EscopoV3 - Sistema de Gestão Contábil Avançado

Bem-vindo ao repositório do **EscopoV3**, uma solução completa para gestão fiscal, contábil, financeira e de recursos humanos, desenvolvida com tecnologias web modernas e arquitetura resiliente.

## 🚀 Visão Geral

O EscopoV3 foi projetado para escritórios de contabilidade e empresas que necessitam de:
*   **Gestão Fiscal**: Emissão e importação de notas, cálculo de impostos (Simples Nacional, Lucro Presumido) e geração de obrigações acessórias (SPED Fiscal, eSocial).
*   **Gestão Financeira**: Controle de fluxo de caixa, conciliação bancária (OFX) e relatórios DRE.
*   **Recursos Humanos**: Gestão de colaboradores, cálculo de folha de pagamento e eventos trabalhistas.
*   **Automação**: Importação em lote de dados, OCR para documentos e integridade de dados via Firebase.

## 🛠 Tecnologias Utilizadas

*   **Frontend**: React.js (Vite), TypeScript, TailwindCSS.
*   **Backend / Persistência**: Firebase (Firestore, Auth, Storage) + Context API para gerenciamento de estado local.
*   **Relatórios**: jsPDF, autoTable, XLSX (SheetJS).
*   **Gráficos**: Recharts.
*   **Ícones**: Lucide React.

## 📦 Estrutura do Projeto

*   `/src`
    *   `/components`: Componentes reutilizáveis de UI (Botões, Modais, Cards) e módulos específicos (Fiscal, CRM).
    *   `/contexts`: Lógica de gerenciamento de estado global (`DataContext`, `AuthContext`).
    *   `/pages`: Páginas da aplicação (Dashboard, Fiscal, Financeiro, etc.).
    *   `/utils`: Funções utilitárias, parsers (OFX, XML), geradores (SPED) e validadores.
    *   `/types`: Definições de tipos TypeScript (Interfaces de dados).

## ⚙️ Instalação e Execução

Pré-requisitos: Node.js (v18+) e NPM.

1.  **Clonar o repositório**
    ```bash
    git clone https://github.com/seu-usuario/escopo-v3.git
    cd escopo-v3
    ```

2.  **Instalar dependências**
    ```bash
    npm install
    ```

3.  **Configurar Variáveis de Ambiente**
    Crie um arquivo `.env` na raiz com as credenciais do Firebase:
    ```env
    VITE_FIREBASE_API_KEY=seu_api_key
    VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
    # ... demais configurações
    ```

4.  **Executar em Desenvolvimento**
    ```bash
    npm run dev
    ```

## 📖 Módulos Principais

### 1. Módulo Fiscal (`/app/fiscal`)
Central de notas fiscais. Suporta importação de XML (NFe, NFCe, CFe), classificação automática de produtos e cálculo de impostos como ICMS (com ST), PIS, COFINS e ISS.
*   **Destaque**: Exportação do arquivo **SPED Fiscal (EFD ICMS/IPI)** validado.

### 2. Módulo Financeiro (`/app/financial`)
Controle total de Entradas e Saídas.
*   Importação de extratos bancários **.OFX** com conciliação inteligente via Regex.
*   Dashboard de fluxo de caixa e DRE gerencial.

### 3. Módulo de RH (`/app/payroll`)
Gestão de funcionários e processamento de folha.
*   Cálculo automático de INSS, IRRF e FGTS com tabelas vigentes (2025).
*   Geração de eventos para o **eSocial**.

### 4. CRM e Cadastros (`/app/crm`)
Gestão centralizada de Clientes, Fornecedores, Produtos e Serviços.
*   Validação de CPF/CNPJ.
*   Busca automática de endereço por CEP.

### 5. Documentos (`/app/documents`)
GED (Gestão Eletrônica de Documentos) integrado.
*   Upload seguro para Firebase Storage.
*   Organização por pastas inteligentes.

## 🤝 Contribuição

1.  Faça um Fork do projeto.
2.  Crie uma Branch para sua Feature (`git checkout -b feature/NovaFeature`).
3.  Faça o Commit (`git commit -m 'Add some NovaFeature'`).
4.  Push para a Branch (`git push origin feature/NovaFeature`).
5.  Abra um Pull Request.

---
**EscopoV3** - *Excelência em Gestão Contábil.*
