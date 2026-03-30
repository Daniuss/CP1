👥 Integrantes do Grupo

| Caio Rossini | RM 555084|
| Gabriel Danius | RM 555747|
| Carlos Eduardo | RM 


🍴 FIAP Cantina App

> Aplicativo mobile desenvolvido como MVP para o Checkpoint 1 da disciplina de Mobile Development & IoT — FIAP 3º Ano Engenharia de Software.

📖 Sobre o Projeto

FIAP Cantina — Fila Digital da Cantina

Problema que Resolve
A cantina da FIAP concentra um grande volume de alunos nos intervalos entre aulas, gerando longas filas e desperdício de tempo. Muitos alunos desistem de comer por não terem tempo suficiente para esperar. O processo atual é inteiramente presencial e manual: o aluno precisa ir até a cantina, escolher o item no balcão, aguardar na fila para pedir e somente depois aguardar o preparo.

Operação Escolhida
**Pedido antecipado e acompanhamento de fila na cantina** — o aluno realiza seu pedido pelo app antes mesmo de chegar à cantina, recebe um número de retirada e acompanha o status em tempo real, retirando o pedido já pronto sem precisar esperar na fila.

Funcionalidades Implementadas
- ✅ Cardápio digital com categorias (Lanches, Refeições, Bebidas, Sobremesas)
- ✅ Filtro por categoria com scroll horizontal
- ✅ Adicionar e remover itens do carrinho diretamente no cardápio
- ✅ Carrinho com controle de quantidades, resumo e total
- ✅ Finalização de pedido com simulação de envio
- ✅ Número de retirada gerado automaticamente
- ✅ Acompanhamento de status em tempo real (Recebido → Preparando → Pronto)
- ✅ Confirmação de retirada pelo aluno
- ✅ Histórico de pedidos concluídos
- ✅ Estados vazios para todas as situações
- ✅ Feedback visual de loading ao enviar pedido

🚀 Como Rodar o Projeto

📱 Demonstração

🏗️ Decisões Técnicas

Estrutura do Projeto
```
fiap-mdi-cp1-cantina-app/
├── app/
│   ├── _layout.tsx          # Layout raiz com Stack Navigator
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab Navigator (3 abas)
│   │   ├── index.tsx        # Tela: Cardápio
│   │   ├── acompanhar.tsx   # Tela: Meu Pedido
│   │   └── historico.tsx    # Tela: Histórico
│   └── pedido/
│       ├── carrinho.tsx     # Tela: Carrinho (modal)
│       └── confirmacao.tsx  # Tela: Confirmação
├── components/
│   ├── CardItem.tsx         # Card de item do cardápio
│   ├── BotaoCarrinho.tsx    # Botão flutuante do carrinho
│   ├── FiltroCategoria.tsx  # Chips de filtro por categoria
│   ├── StatusBadge.tsx      # Badge de status do pedido
│   ├── EstadoVazio.tsx      # Componente de estado vazio
│   └── LoadingSpinner.tsx   # Indicador de carregamento
├── constants/
│   ├── Colors.ts            # Tema visual (identidade FIAP)
│   └── Cardapio.ts          # Dados e tipos do cardápio
└── hooks/
    ├── useCarrinho.ts       # Lógica do carrinho de compras
    └── usePedido.ts         # Lógica de pedidos e status
```

Hooks Utilizados
| Hook | Onde | Para quê
| `useState` | Todas as telas e hooks | Gerenciar estado local (carrinho, filtros, pedido, status)
| `useEffect` | `CarrinhoScreen`, `AcompanharScreen`, `ConfirmacaoScreen` | Polling de status, animações de entrada, listeners
| `useCallback` | `CardapioScreen`, `useCarrinho` | Memoizar funções para evitar re-renders desnecessários
| `useCarrinho` (custom) | `CardapioScreen`, `CarrinhoScreen` | Encapsula toda a lógica do carrinho (adicionar, remover, totais)
| `usePedido` (custom) | `CarrinhoScreen` | Encapsula o fluxo de realização de pedido e simulação de status
| `useRef` que usamos no confirmacao.tsx para as animações, e menciona o Context API (AppProvider, useCarrinhoContext, usePedidoContext) na seção de decisões técnicas

Como a Navegação foi Organizada
O projeto utiliza **Expo Router** com estrutura de arquivos:
- **Tab Navigator** (`app/(tabs)/`): Navegação principal entre Cardápio, Meu Pedido e Histórico
- **Stack Navigator** (`app/_layout.tsx`): Para telas modais (Carrinho) e telas de fluxo (Confirmação)
- **Rotas dinâmicas**: `app/pedido/carrinho` como modal e `app/pedido/confirmacao` como tela de stack sem voltar

## 🔮 Próximos Passos

- [ ] Integração com backend real (API REST ou Firebase) para persistência dos pedidos
- [ ] Autenticação com login do aluno via RM
- [ ] Notificações push quando o pedido ficar pronto
- [ ] Pagamento in-app integrado (Pix ou cartão)
- [ ] Painel administrativo para a equipe da cantina gerenciar pedidos
- [ ] Modo offline com sincronização quando a conexão retornar
- [ ] Avaliação e histórico de pedidos favoritos

---

## 🛠️ Tecnologias

- [React Native](https://reactnative.dev/) 0.74
- [Expo](https://expo.dev/) 51
- [Expo Router](https://expo.github.io/router/) 3.5
- TypeScript
