# Cardápio Digital

Aplicação Vue 3 para gerenciamento de cardápio de uma lanchonete fictícia. Permite cadastrar, visualizar, filtrar por categoria e remover itens do cardápio.

## Como rodar

### Desenvolvimento local

```bash
npm install
npm run dev
```

### Docker

```bash
docker build -t cardapio-digital .
docker run -p 8080:80 cardapio-digital
```

Acesse `http://localhost:8080`.

---

## Conceitos Vue aplicados e onde encontrá-los

### 1. Componentes e organização

A aplicação possui 6 componentes com responsabilidades bem definidas:

| Componente | Arquivo | Responsabilidade |
|---|---|---|
| App | `src/App.vue` | Componente raiz, dono do estado (items, filtro ativo, notificações) |
| MenuForm | `src/components/MenuForm.vue` | Formulário de cadastro |
| CategoryFilter | `src/components/CategoryFilter.vue` | Botões de filtro por categoria |
| MenuItem | `src/components/MenuItem.vue` | Card individual de cada item |
| MenuSummary | `src/components/MenuSummary.vue` | Exibição do resumo estatístico |
| NotificationToast | `src/components/NotificationToast.vue` | Toast de notificação com auto-dismiss |

### 2. Props (comunicação pai → filho)

- **App → MenuSummary** (`App.vue`, linhas 15-18): passa `totalItems`, `availableItems` e `averagePrice` como props.
- **App → CategoryFilter** (`App.vue`, linha 21): passa `activeCategory`.
- **App → MenuItem** (`App.vue`, linha 29): passa o objeto `item`.

### 3. Eventos / $emit (comunicação filho → pai)

- **MenuForm → App** (`MenuForm.vue`, linha 57): emite `add-item` com os dados do novo item.
- **CategoryFilter → App** (`CategoryFilter.vue`, linha 10): emite `filter-change` com a categoria selecionada.
- **MenuItem → App** (`MenuItem.vue`, linha 6): emite `remove-item` com o id do item.

### 4. Computed Properties (dados derivados)

- **filteredItems** (`App.vue`, linha 63): filtra a lista de itens com base na categoria ativa.
- **availableCount** (`App.vue`, linha 68): conta itens disponíveis.
- **averagePrice** (`App.vue`, linha 72): calcula preço médio dos itens visíveis no filtro atual.

### 5. Lifecycle Hooks — mounted, updated, unmounted

- **mounted**
  - `App.vue`, linha 85: carrega itens salvos no `localStorage` ao montar.
  - `MenuForm.vue`, linha 53: faz auto-focus no campo "Nome" ao montar o formulário.
  - `NotificationToast.vue`, linha 34: inicia o timer de auto-dismiss ao montar o toast.

- **updated**
  - `App.vue`, linha 92: atualiza o `document.title` com a contagem de itens a cada re-render.

- **unmounted**
  - `NotificationToast.vue`, linha 40: limpa o `setTimeout` ao desmontar o toast (evita memory leak).

### 6. Watchers

- **App.vue**, linha 83: `watch` profundo no array `items` para persistir no `localStorage`.

### 7. v-model e modificadores

- **MenuForm.vue**, linhas 7-19: `v-model.trim` (nome), `v-model.number` (preço), `v-model` (categoria, disponibilidade).

### 8. Diretivas de template

- `v-for` com `:key` — renderização de listas (`App.vue` linha 28, `MenuForm.vue` linha 16, `CategoryFilter.vue` linha 7).
- `v-if` / `v-else` — renderização condicional (`App.vue` linhas 26 e 34).
- Binding dinâmico de classes (`:class`) — destaque do filtro ativo (`CategoryFilter.vue` linha 9), estilo de indisponível (`MenuItem.vue` linha 3).

### 9. Prevenção de comportamento padrão

- `@submit.prevent` no formulário (`MenuForm.vue`, linha 2).
