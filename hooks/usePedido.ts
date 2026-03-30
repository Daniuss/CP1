import { useState, useCallback } from 'react';
import { ItemCarrinho } from './useCarrinho';

export type StatusPedido = 'aguardando' | 'preparando' | 'pronto' | 'entregue';

export interface Pedido {
  id: string;
  itens: ItemCarrinho[];
  total: number;
  status: StatusPedido;
  numeroPedido: number;
  horario: Date;
  tempoEstimado: number;
}

export function usePedido() {
  const [pedidoAtivo, setPedidoAtivo] = useState<Pedido | null>(null);
  const [historico, setHistorico] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const realizarPedido = useCallback(
    async (itens: ItemCarrinho[], total: number, tempoEstimado: number) => {
      setLoading(true);
      setErro(null);

      try {
        // Simula chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const novoPedido: Pedido = {
          id: `pedido-${Date.now()}`,
          itens,
          total,
          status: 'aguardando',
          numeroPedido: Math.floor(Math.random() * 900) + 100,
          horario: new Date(),
          tempoEstimado,
        };

        setPedidoAtivo(novoPedido);

        // Simula progressão automática do status
        setTimeout(() => {
          setPedidoAtivo((prev) =>
            prev ? { ...prev, status: 'preparando' } : prev
          );
        }, 3000);

        setTimeout(() => {
          setPedidoAtivo((prev) =>
            prev ? { ...prev, status: 'pronto' } : prev
          );
        }, 8000);

        return novoPedido;
      } catch {
        setErro('Erro ao realizar pedido. Tente novamente.');
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const confirmarRetirada = useCallback(() => {
    if (!pedidoAtivo) return;
    const pedidoConcluido = { ...pedidoAtivo, status: 'entregue' as StatusPedido };
    setHistorico((prev) => [pedidoConcluido, ...prev]);
    setPedidoAtivo(null);
  }, [pedidoAtivo]);

  const limparErro = useCallback(() => setErro(null), []);

  return {
    pedidoAtivo,
    historico,
    loading,
    erro,
    realizarPedido,
    confirmarRetirada,
    limparErro,
  };
}
