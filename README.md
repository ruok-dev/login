# 🎭 Animated Characters Auth Interface

Uma interface de autenticação ultra-interativa, moderna e segura, construída com Next.js 15, Tailwind CSS e Framer Motion (inspirado). Este projeto foi desenvolvido para demonstrar habilidades avançadas de UI/UX e práticas robustas de segurança no backend.

![Status](https://img.shields.io/badge/Status-Production--Ready-emerald?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-Hardened-blue?style=for-the-badge)

## ✨ Funcionalidades Principais

- **Personagens Reativos**: Quatro personagens que acompanham o movimento do cursor, reagem ao foco do input e "escondem os olhos" durante a digitação de senhas sensíveis.
- **Micro-interações Premium**: Cursor magnético personalizado, animações de "queda" (staggered) dos elementos do formulário e feedback tátil em todos os botões.
- **Sistema de Celebração**: Animação de pulo sincronizada e tela de sucesso explosiva ao realizar o cadastro.
- **Experiência Fluida**: Troca de abas (Entrar/Criar conta) com transições suaves e sem "jumps" de layout.

## 🛡️ Arquitetura de Segurança

Este projeto não é apenas um "rostinho bonito". Ele implementa padrões de segurança recomendados para aplicações modernas:

- **Autenticação JWT**: Emissão de tokens JSON Web Tokens assinados no servidor.
- **HttpOnly Cookies**: Armazenamento de tokens em cookies protegidos contra XSS (Cross-Site Scripting).
- **Validação de Schema (Zod)**: Todos os dados que chegam à API são validados rigorosamente para prevenir injeções ou payloads maliciosos.
- **Segurança de Dados Sensíveis**: Uso de variáveis de ambiente (`.env`) para garantir que segredos nunca sejam expostos no controle de versão.
- **Rate Limit Awareness**: Estrutura preparada para implementação de limites de requisição.

## 🚀 Tecnologias Utilizadas

- **Framework**: [Next.js 15+](https://nextjs.org/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Componentes**: [Radix UI](https://www.radix-ui.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Segurança**: [Jose (JWT)](https://github.com/panva/jose) + [Zod](https://zod.dev/)

## 🛠️ Instalação e Uso

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/login-interface.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Preencha os valores no `.env.local`.

4. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

Desenvolvido por **ruokDEV**
