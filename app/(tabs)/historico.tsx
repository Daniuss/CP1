import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { StatusBadge } from '@/components/StatusBadge';
import { EstadoVazio } from '@/components/EstadoVazio';
import { usePedidoContext } from '@/context/AppContext';

export default function HistoricoScreen() {
  const router = useRouter();
  const { historico } = usePedidoContext();

  if (historico.length === 0) {
    return (
      <View style={styles.container}>
        <EstadoVazio
          emoji="🕐"
          titulo="Nenhum pedido anterior"
          descricao="Seus pedidos concluídos aparecerão aqui para consulta."
          textoBotao="Fazer primeiro pedido"
          onPressBotao={() => router.push('/')}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Seus pedidos</Text>

      {historico.map((pedido) => (
        <View key={pedido.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.numeroPedidoLabel}>Pedido</Text>
              <Text style={styles.numeroPedido}>#{pedido.numeroPedido}</Text>
            </View>
            <StatusBadge status={pedido.status} />
          </View>

          <View style={styles.divider} />

          <View style={styles.itensResumo}>
            {pedido.itens.slice(0, 3).map((ic) => (
              <Text key={ic.item.id} style={styles.itemTexto}>
                {ic.item.emoji} {ic.item.nome} x{ic.quantidade}
              </Text>
            ))}
            {pedido.itens.length > 3 && (
              <Text style={styles.maisItens}>
                +{pedido.itens.length - 3} item(s)...
              </Text>
            )}
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.horario}>
              🕐{' '}
              {pedido.horario.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Text style={styles.total}>
              R$ {pedido.total.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 40, gap: 12 },
  titulo: { fontSize: 20, fontWeight: '800', color: Colors.text, marginBottom: 4 },
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
  numeroPedidoLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '500' },
  numeroPedido: { fontSize: 22, fontWeight: '900', color: Colors.primary },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 10 },
  itensResumo: { gap: 4, marginBottom: 10 },
  itemTexto: { fontSize: 13, color: Colors.text },
  maisItens: { fontSize: 12, color: Colors.textMuted, fontStyle: 'italic' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  horario: { fontSize: 12, color: Colors.textLight },
  total: { fontSize: 16, fontWeight: '800', color: Colors.primary },
});