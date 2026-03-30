import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { EstadoVazio } from '@/components/EstadoVazio';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useCarrinhoContext, usePedidoContext } from '@/context/AppContext';

export default function CarrinhoScreen() {
  const router = useRouter();
  const carrinho = useCarrinhoContext();
  const { realizarPedido, loading, erro, limparErro } = usePedidoContext();

  useEffect(() => {
    if (erro) {
      Alert.alert('Erro', erro, [{ text: 'OK', onPress: limparErro }]);
    }
  }, [erro]);

  const handleFinalizar = async () => {
    if (carrinho.totalItens === 0) return;

    const pedido = await realizarPedido(
      carrinho.carrinho,
      carrinho.totalValor,
      carrinho.tempoEstimadoTotal
    );

    if (pedido) {
      carrinho.limparCarrinho();
      router.replace('/pedido/confirmacao');
    }
  };

  if (loading) {
    return (
      <View style={styles.containerCentro}>
        <LoadingSpinner mensagem="Enviando seu pedido..." />
      </View>
    );
  }

  if (carrinho.totalItens === 0) {
    return (
      <View style={styles.container}>
        <EstadoVazio
          emoji="🛒"
          titulo="Carrinho vazio"
          descricao="Adicione itens do cardápio para fazer seu pedido."
          textoBotao="Ver Cardápio"
          onPressBotao={() => router.back()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Itens selecionados</Text>

        {carrinho.carrinho.map((itemCarrinho) => (
          <View key={itemCarrinho.item.id} style={styles.card}>
            <Text style={styles.itemEmoji}>{itemCarrinho.item.emoji}</Text>

            <View style={styles.itemInfo}>
              <Text style={styles.itemNome}>{itemCarrinho.item.nome}</Text>
              <Text style={styles.itemPrecoUnit}>
                R$ {itemCarrinho.item.preco.toFixed(2).replace('.', ',')} un.
              </Text>
            </View>

            <View style={styles.controles}>
              <TouchableOpacity
                style={styles.btnCtrl}
                onPress={() => carrinho.removerItem(itemCarrinho.item.id)}
              >
                <Text style={styles.btnCtrlText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantidade}>{itemCarrinho.quantidade}</Text>

              <TouchableOpacity
                style={[styles.btnCtrl, styles.btnCtrlAdd]}
                onPress={() => carrinho.adicionarItem(itemCarrinho.item)}
              >
                <Text style={[styles.btnCtrlText, styles.btnCtrlAddText]}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.itemTotal}>
              <Text style={styles.itemTotalValor}>
                R$ {(itemCarrinho.item.preco * itemCarrinho.quantidade)
                  .toFixed(2)
                  .replace('.', ',')}
              </Text>
              <TouchableOpacity onPress={() => carrinho.removerItemCompleto(itemCarrinho.item.id)}>
                <Text style={styles.btnRemover}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.resumo}>
          <Text style={styles.resumoTitulo}>Resumo</Text>

          <View style={styles.resumoLinha}>
            <Text style={styles.resumoLabel}>Subtotal ({carrinho.totalItens} itens)</Text>
            <Text style={styles.resumoValor}>
              R$ {carrinho.totalValor.toFixed(2).replace('.', ',')}
            </Text>
          </View>

          <View style={styles.resumoLinha}>
            <Text style={styles.resumoLabel}>Taxa de serviço</Text>
            <Text style={[styles.resumoValor, { color: Colors.success }]}>Grátis</Text>
          </View>

          <View style={styles.resumoLinha}>
            <Text style={styles.resumoLabel}>⏱ Tempo estimado</Text>
            <Text style={styles.resumoValor}>~{carrinho.tempoEstimadoTotal} min</Text>
          </View>

          <View style={[styles.resumoLinha, styles.totalLinha]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValor}>
              R$ {carrinho.totalValor.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.rodape}>
        <TouchableOpacity
          style={styles.btnFinalizar}
          onPress={handleFinalizar}
          activeOpacity={0.85}
        >
          <Text style={styles.btnFinalizarTexto}>
            Finalizar Pedido · R$ {carrinho.totalValor.toFixed(2).replace('.', ',')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  containerCentro: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center' },
  content: { padding: 16, paddingBottom: 20, gap: 10 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  card: {
    backgroundColor: Colors.card, borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', gap: 10,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  itemEmoji: { fontSize: 28 },
  itemInfo: { flex: 1 },
  itemNome: { fontSize: 14, fontWeight: '700', color: Colors.text },
  itemPrecoUnit: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  controles: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  btnCtrl: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: Colors.border, alignItems: 'center', justifyContent: 'center',
  },
  btnCtrlAdd: { backgroundColor: Colors.primary },
  btnCtrlText: { fontSize: 18, fontWeight: '700', color: Colors.text, lineHeight: 20 },
  btnCtrlAddText: { color: Colors.white },
  quantidade: { fontSize: 15, fontWeight: '700', color: Colors.text, minWidth: 20, textAlign: 'center' },
  itemTotal: { alignItems: 'flex-end', gap: 4 },
  itemTotalValor: { fontSize: 14, fontWeight: '800', color: Colors.primary },
  btnRemover: { fontSize: 16 },
  resumo: { backgroundColor: Colors.card, borderRadius: 16, padding: 16, marginTop: 6, gap: 10 },
  resumoTitulo: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  resumoLinha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resumoLabel: { fontSize: 14, color: Colors.textLight },
  resumoValor: { fontSize: 14, fontWeight: '600', color: Colors.text },
  totalLinha: { paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border, marginTop: 4 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: Colors.text },
  totalValor: { fontSize: 20, fontWeight: '900', color: Colors.primary },
  rodape: {
    padding: 16, paddingBottom: 32, backgroundColor: Colors.card,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  btnFinalizar: {
    backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
  },
  btnFinalizarTexto: { color: Colors.white, fontSize: 16, fontWeight: '800' },
});