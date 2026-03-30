import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { cardapio, ItemCardapio } from '@/constants/Cardapio';
import { useCarrinhoContext } from '@/context/AppContext';
import { CardItem } from '@/components/CardItem';
import { FiltroCategoria } from '@/components/FiltroCategoria';
import { BotaoCarrinho } from '@/components/BotaoCarrinho';
import { EstadoVazio } from '@/components/EstadoVazio';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function CardapioScreen() {
  const router = useRouter();
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const carrinho = useCarrinhoContext();

  const itensFiltrados = categoriaAtiva === 'todos'
    ? cardapio
    : cardapio.filter((item) => item.categoria === categoriaAtiva);

  const handleAdicionar = useCallback(
    (item: ItemCardapio) => carrinho.adicionarItem(item),
    [carrinho]
  );

  const handleRemover = useCallback(
    (itemId: string) => carrinho.removerItem(itemId),
    [carrinho]
  );

  const renderItem = useCallback(
    ({ item }: { item: ItemCardapio }) => (
      <CardItem
        item={item}
        quantidade={carrinho.quantidadeItem(item.id)}
        onAdicionar={() => handleAdicionar(item)}
        onRemover={() => handleRemover(item.id)}
      />
    ),
    [carrinho, handleAdicionar, handleRemover]
  );

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitulo}>Olá, aluno! 👋</Text>
        <Text style={styles.bannerSubtitulo}>
          Faça seu pedido e retire sem fila
        </Text>
      </View>

      <FiltroCategoria
        categoriaAtiva={categoriaAtiva}
        onChange={setCategoriaAtiva}
      />

      <FlatList
        data={itensFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EstadoVazio
            emoji="🔍"
            titulo="Nenhum item encontrado"
            descricao="Não há itens disponíveis nesta categoria no momento."
            textoBotao="Ver todos"
            onPressBotao={() => setCategoriaAtiva('todos')}
          />
        }
      />

      <BotaoCarrinho
        totalItens={carrinho.totalItens}
        totalValor={carrinho.totalValor}
        onPress={() => router.push('/pedido/carrinho')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  banner: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  bannerTitulo: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
  },
  bannerSubtitulo: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  lista: {
    paddingTop: 8,
    paddingBottom: 100,
  },
});
