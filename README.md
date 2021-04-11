# nodejs-graphql-fp

Node.js, Apollo Server, TypeScript, fp-ts, Prisma, rxjs

## Criação do boilerplate do zero

Ignorando a possibilidade de clonar esse repo, para fazer a criação dele é só seguir
os passos abaixo:

- Crie o arquivo `.editorconfig` com o conteúdo:

```editorconfig
# editorconfig.org
root = true

[*]
indent_size = 2
indent_style = space
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

- Criar um diretório para o projeto, com um diretório `src`;
- Criar o `package.json` com `yarn init -y`;
- Instalar o TS com `yarn add --dev --exact typescript`;
- Iniciar a config do TS com `yarn tsc --init`;
- Instale o TS Node e Nodemon para dev com `yarn add --dev --exact nodemon ts-node`;
- Configure o script `dev` no `package.json`;
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
  - Edite o arquivo `.eslintrc.js` para ficar com o seguinte conteúdo:

```js
module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'standard',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    camelcase: 'off',
    'no-warning-comments': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
}
```

- Instale o Jest com `yarn add --dev --exact jest @types/jest`
