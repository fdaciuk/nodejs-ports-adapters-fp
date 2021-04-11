# nodejs-graphql-fp

Node.js, Apollo Server, TypeScript, fp-ts, Prisma, rxjs

## Criação do boilerplate do zero

Ignorando a possibilidade de clonar esse repo, para fazer a criação dele é só seguir
os passos abaixo:

- Crie o arquivo `.editorconfig` com o conteúdo;
- Criar um diretório para o projeto, com um diretório `src`;
- Criar o `package.json` com `yarn init -y`;
- Adicione os scripts do `package.json`;
- Instalar o TS com `yarn add --dev --exact typescript`;
- Iniciar a config do TS com `yarn tsc --init`;
- Instale o TS Node e Nodemon para dev com `yarn add --dev --exact nodemon ts-node`;
- Configure o script `dev` no `package.json`;
- Instale o Jest com `yarn add --dev --exact jest ts-jest eslint-plugin-jest @types/jest`;
- Instalar o eslint com `yarn add --dev --exact eslint`;
- Iniciar a config do EsLint com `yarn eslint --init`;
  - Selecionar "To check syntax, find problems, and enforce code style";
  - Selecionar "JavaScript modules (import/export)";
  - Selecionar framework "None of these";
  - Selecionar "Yes" para TypeScript;
  - Deselecionar "Browser" e selecionar "Node" (usando a tecla espaço);
  - Selecionar "Use a popular style guide";
  - Selecionar "Standard";
  - Selecionar formato JavaScript;
  - Selecionar "No" para instalar as dependências;
  - Copiar a lista de dependências;
  - Instalar as dependências com `yarn add --dev --exact <lista-de-dependencias>`;
- Instale o husky com `yarn add --dev --exact husky`;
  - Adicione o script `prepare` seu `package.json`;
  - Execute o comando `yarn prepare && yarn husky add .husky/pre-commit "yarn type-check && yarn lint"`;

