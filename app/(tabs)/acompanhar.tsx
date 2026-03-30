import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { StatusBadge } from '@/components/StatusBadge';
import { EstadoVazio } from '@/components/EstadoVazio';
import { usePedidoContext } from '@/context/AppContext';
import { StatusPedido } from '@/hooks/usePedido';

const { width } = Dimensions.get('window');

const etapas: { status: StatusPedido; label: string; emoji: string }[] = [
  { status: 'aguardando', label: 'Recebido', emoji: '📥' },
  { status: 'preparando', label: 'Preparando', emoji: '👨‍🍳' },
  { status: 'pronto', label: 'Pronto!', emoji: '✅' },
];

function indiceEtapa(status: StatusPedido): number {
  if (status === 'aguardando') return 0;
  if (status === 'preparando') return 1;
  if (status === 'pronto' || status === 'entregue') return 2;
  return 0;
}

export default function AcompanharScreen() {
  const router = useRouter();
  const { pedidoAtivo, confirmarRetirada } = usePedidoContext();

  if (!pedidoAtivo) {
    return (
      <View style={styles.container}>
        <EstadoVazio
          emoji="📋"
          titulo="Nenhum pedido ativo"
          descricao="Faça um pedido no cardápio e acompanhe aqui em tempo real."
          textoBotao="Ir ao Cardápio"
          onPressBotao={() => router.push('/')}
        />
      </View>
    );
  }

  const etapaAtual = indiceEtapa(pedidoAtivo.status);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.numeroPedidoLabel}>Número do pedido</Text>
            <Text style={styles.numeroPedido}>#{pedidoAtivo.numeroPedido}</Text>
          </View>
          <StatusBadge status={pedidoAtivo.status} grande />
        </View>
        <View style={styles.divider} />
        <Text style={styles.horario}>
          🕐 Pedido às{' '}
          {pedidoAtivo.horario.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Acompanhe seu pedido</Text>
        <View style={styles.etapasContainer}>
          {etapas.map((etapa, index) => {
            const concluida = index <= etapaAtual;
            const atual = index === etapaAtual && pedidoAtivo.status !== 'entregue';
            return (
              <React.Fragment key={etapa.status}>
                <View style={styles.etapa}>
                  <View style={[
                    styles.etapaCirculo,
                    concluida && styles.etapaCirculoConcluida,
                    atual && styles.etapaCirculoAtual,
                  ]}>
                    <Text style={styles.etapaEmoji}>{etapa.emoji}</Text>
                  </View>
                  <Text style={[styles.etapaLabel, concluida && styles.etapaLabelConcluida]}>
                    {etapa.label}
                  </Text>
                </View>
                {index < etapas.length - 1 && (
                  <View style={[styles.etapaLinha, index < etapaAtual && styles.etapaLinhaConcluida]} />
                )}
              </React.Fragment>
            );
          })}
        </View>
        {pedidoAtivo.status === 'pronto' && (
          <View style={styles.alertaPronto}>
            <Text style={styles.alertaProntoTexto}>
              🎉 Seu pedido está pronto! Retire no balcão.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Itens do pedido</Text>
        {pedidoAtivo.itens.map((itemCarrinho) => (
          <View key={itemCarrinho.item.id} style={styles.itemLinha}>
            <Text style={styles.itemEmoji}>{itemCarrinho.item.emoji}</Text>
            <Text style={styles.itemNome} numberOfLines={1}>{itemCarrinho.item.nome}</Text>
            <Text style={styles.itemQtd}>x{itemCarrinho.quantidade}</Text>
            <Text style={styles.itemPreco}>
              R$ {(itemCarrinho.item.preco * itemCarrinho.quantidade).toFixed(2).replace('.', ',')}
            </Text>
          </View>
        ))}
        <View style={styles.divider} />
        <View style={styles.totalLinha}>
          <Text style={styles.totalLabel}>Total pago</Text>
          <Text style={styles.totalValor}>
            R$ {pedidoAtivo.total.toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </View>

      {pedidoAtivo.status === 'pronto' && (
        <TouchableOpacity style={styles.btnRetirada} onPress={confirmarRetirada}>
          <Text style={styles.btnRetiradaTexto}>✅  Confirmar Retirada</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, gap: 12, paddingBottom: 40 },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  numeroPedidoLabel: { fontSize: 12, color: Colors.textMuted, fontWeight: '500' },
  numeroPedido: { fontSize: 28, fontWeight: '900', color: Colors.primary },
  horario: { fontSize: 13, color: Colors.textLight, marginTop: 4 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 16 },
  etapasContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  etapa: { alignItems: 'center', gap: 6 },
  etapaCirculo: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: Colors.border, alignItems: 'center', justifyContent: 'center',
  },
  etapaCirculoConcluida: { backgroundColor: '#D1FAE5' },
  etapaCirculoAtual: { backgroundColor: '#DBEAFE', borderWidth: 2, borderColor: '#1D4ED8' },
  etapaEmoji: { fontSize: 22 },
  etapaLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '600' },
  etapaLabelConcluida: { color: Colors.text },
  etapaLinha: {
    flex: 1, height: 3, backgroundColor: Colors.border,
    marginHorizontal: 4, marginBottom: 20, borderRadius: 2,
  },
  etapaLinhaConcluida: { backgroundColor: Colors.success },
  alertaPronto: {
    backgroundColor: '#D1FAE5', borderRadius: 12,
    padding: 12, marginTop: 12, alignItems: 'center',
  },
  alertaProntoTexto: { color: '#065F46', fontWeight: '700', fontSize: 14, textAlign: 'center' },
  itemLinha: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6 },
  itemEmoji: { fontSize: 18 },
  itemNome: { flex: 1, fontSize: 14, color: Colors.text, fontWeight: '500' },
  itemQtd: { fontSize: 13, color: Colors.textLight, fontWeight: '600' },
  itemPreco: { fontSize: 14, color: Colors.primary, fontWeight: '700', minWidth: 70, textAlign: 'right' },
  totalLinha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 15, fontWeight: '700', color: Colors.text },
  totalValor: { fontSize: 18, fontWeight: '900', color: Colors.primary },
  btnRetirada: {
    backgroundColor: Colors.success, borderRadius: 14, paddingVertical: 16, alignItems: 'center',
    shadowColor: Colors.success, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnRetiradaTexto: { color: Colors.white, fontSize: 16, fontWeight: '800' },
});