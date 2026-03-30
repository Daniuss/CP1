import { useState, useCallback } from 'react';
import { ItemCardapio } from '@/constants/Cardapio';

export interface ItemCarrinho {
  item: ItemCardapio;
  quantidade: number;
}

export function useCarrinho() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  const adicionarItem = useCallback((item: ItemCardapio) => {
    setCarrinho((prev) => {
      const existente = prev.find((c) => c.item.id === item.id);
      if (existente) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantidade: c.quantidade + 1 } : c
        );
      }
      return [...prev, { item, quantidade: 1 }];
    });
  }, []);

  const removerItem = useCallback((itemId: string) => {
    setCarrinho((prev) => {
      const existente = prev.find((c) => c.item.id === itemId);
      if (existente && existente.quantidade > 1) {
        return prev.map((c) =>
          c.item.id === itemId ? { ...c, quantidade: c.quantidade - 1 } : c
        );
      }
      return prev.filter((c) => c.item.id !== itemId);
    });
  }, []);

  const removerItemCompleto = useCallback((itemId: string) => {
    setCarrinho((prev) => prev.filter((c) => c.item.id !== itemId));
  }, []);

  const limparCarrinho = useCallback(() => {
    setCarrinho([]);
  }, []);

  const quantidadeItem = useCallback(
    (itemId: string) => {
      return carrinho.find((c) => c.item.id === itemId)?.quantidade ?? 0;
    },
    [carrinho]
  );

  const totalItens = carrinho.reduce((acc, c) => acc + c.quantidade, 0);

  const totalValor = carrinho.reduce(
    (acc, c) => acc + c.item.preco * c.quantidade,
    0
  );

  const tempoEstimadoTotal = carrinho.reduce(
    (acc, c) => Math.max(acc, c.item.tempoEstimado),
    0
  );

  return {
    carrinho,
    adicionarItem,
    removerItem,
    removerItemCompleto,
    limparCarrinho,
    quantidadeItem,
    totalItens,
    totalValor,
    tempoEstimadoTotal,
  };
}
