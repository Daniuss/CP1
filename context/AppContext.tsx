import React, { createContext, useContext, ReactNode } from 'react';
import { useCarrinho } from '@/hooks/useCarrinho';
import { usePedido } from '@/hooks/usePedido';

type CarrinhoContextType = ReturnType<typeof useCarrinho>;
type PedidoContextType = ReturnType<typeof usePedido>;

const CarrinhoContext = createContext<CarrinhoContextType | null>(null);
const PedidoContext = createContext<PedidoContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const carrinho = useCarrinho();
  const pedido = usePedido();

  return (
    <CarrinhoContext.Provider value={carrinho}>
      <PedidoContext.Provider value={pedido}>
        {children}
      </PedidoContext.Provider>
    </CarrinhoContext.Provider>
  );
}

export function useCarrinhoContext(): CarrinhoContextType {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) throw new Error('useCarrinhoContext deve ser usado dentro de AppProvider');
  return ctx;
}

export function usePedidoContext(): PedidoContextType {
  const ctx = useContext(PedidoContext);
  if (!ctx) throw new Error('usePedidoContext deve ser usado dentro de AppProvider');
  return ctx;
}