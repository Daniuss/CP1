export interface ItemCardapio {
 id: string;
 nome: string;
 descricao: string;
 preco: number;
 categoria: 'lanches' | 'refeicoes' | 'bebidas' | 'sobremesas';
 emoji: string;
 disponivel: boolean;
 tempoEstimado: number; // em minutos
}
export const cardapio: ItemCardapio[] = [
 // Lanches
 {
 id: '1',
 nome: 'X-Burguer FIAP',
 descricao: 'Hambúrguer artesanal com queijo, alface e tomate',
 preco: 18.9,
 categoria: 'lanches',
 emoji: '🍔',
 disponivel: true,
 tempoEstimado: 8,
 },
 {
 id: '2',
 nome: 'Wrap Frango Grelhado',
 descricao: 'Wrap integral com frango, cream cheese e rúcula',
 preco: 16.5,
 categoria: 'lanches',
 emoji: '🌯',
 disponivel: true,
 tempoEstimado: 6,
 },
 {
 id: '3',
 nome: 'Misto Quente',
descricao: 'Pão de forma com presunto e queijo gratinado',
 preco: 10.0,
 categoria: 'lanches',
 emoji: '🥪',
 disponivel: true,
 tempoEstimado: 4,
 },
 // Refeições
 {
 id: '4',
 nome: 'Prato do Dia',
 descricao: 'Arroz, feijão, proteína, salada e suco',
 preco: 28.0,
 categoria: 'refeicoes',
 emoji: '🍽',
 disponivel: true,
 tempoEstimado: 5,
 },
 {
 id: '5',
 nome: 'Macarrão à Bolonhesa',
 descricao: 'Macarrão al dente com molho bolonhesa caseiro',
 preco: 22.0,
 categoria: 'refeicoes',
 emoji: '🍝',
 disponivel: false,
 tempoEstimado: 7,
 },
 {
 id: '6',
 nome: 'Salada Completa',
 descricao: 'Mix de folhas, frango, cenoura, beterraba e molho',
 preco: 19.9,
 categoria: 'refeicoes',
 emoji: '🥗',
 disponivel: true,
 tempoEstimado: 4,
 },
 // Bebidas
 {
 id: '7',
 nome: 'Suco Natural',
 descricao: 'Laranja, limão, abacaxi ou maracujá (300ml)',
preco: 8.0,
 categoria: 'bebidas',
 emoji: '🍊',
 disponivel: true,
 tempoEstimado: 2,
 },
 {
 id: '8',
 nome: 'Café Expresso',
 descricao: 'Café forte e encorpado, grão selecionado',
 preco: 5.0,
 categoria: 'bebidas',
 emoji: '☕',
 disponivel: true,
 tempoEstimado: 1,
 },
 {
 id: '9',
 nome: 'Refrigerante Lata',
 descricao: 'Coca-Cola, Guaraná ou Fanta (350ml)',
 preco: 6.5,
 categoria: 'bebidas',
 emoji: '🥤',
 disponivel: true,
 tempoEstimado: 1,
 },
 // Sobremesas
 {
 id: '10',
 nome: 'Brownie de Chocolate',
 descricao: 'Brownie caseiro com calda de chocolate',
 preco: 9.0,
 categoria: 'sobremesas',
 emoji: '🍫',
 disponivel: true,
 tempoEstimado: 1,
 },
 {
 id: '11',
 nome: 'Iogurte com Granola',
 descricao: 'Iogurte grego com granola e mel',
 preco: 11.0,
 categoria: 'sob',
emoji: '🥛',
 disponivel: true,
 tempoEstimado: 1,
 },
];
export const categorias = [
 { id: 'todos', label: 'Todos', emoji: '🍴' },
 { id: 'lanches', label: 'Lanches', emoji: '🥪' },
 { id: 'refeicoes', label: 'Refeições', emoji: '🍽' },
 { id: 'bebidas', label: 'Bebidas', emoji: '🥤' },
 { id: 'sobremesas', label: 'Sobremesas', emoji: '🍫' },
];
