import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { usePedidoContext } from '@/context/AppContext';

export default function ConfirmacaoScreen() {
  const router = useRouter();
  const { pedidoAtivo } = usePedidoContext();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!pedidoAtivo) {
    router.replace('/');
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
        ]}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.iconEmoji}>✅</Text>
        </View>

        <Text style={styles.titulo}>Pedido confirmado!</Text>
        <Text style={styles.subtitulo}>
          Seu pedido foi recebido com sucesso e já está na fila de preparo.
        </Text>

        <View style={styles.numeroPedidoCard}>
          <Text style={styles.numeroPedidoLabel}>Seu número de retirada</Text>
          <Text style={styles.numeroPedido}>#{pedidoAtivo.numeroPedido}</Text>
          <Text style={styles.numeroPedidoInfo}>
            Guarde esse número — ele será chamado quando seu pedido estiver pronto.
          </Text>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoEmoji}>⏱</Text>
            <Text style={styles.infoValor}>~{pedidoAtivo.tempoEstimado} min</Text>
            <Text style={styles.infoLabel}>Tempo estimado</Text>
          </View>

          <View style={styles.infoSeparador} />

          <View style={styles.infoItem}>
            <Text style={styles.infoEmoji}>🛒</Text>
            <Text style={styles.infoValor}>
              {pedidoAtivo.itens.reduce((a, i) => a + i.quantidade, 0)}
            </Text>
            <Text style={styles.infoLabel}>Itens</Text>
          </View>

          <View style={styles.infoSeparador} />

          <View style={styles.infoItem}>
            <Text style={styles.infoEmoji}>💰</Text>
            <Text style={styles.infoValor}>
              R${pedidoAtivo.total.toFixed(2).replace('.', ',')}
            </Text>
            <Text style={styles.infoLabel}>Total</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnAcompanhar}
          onPress={() => router.replace('/acompanhar')}
        >
          <Text style={styles.btnAcompanharTexto}>📋  Acompanhar Pedido</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.btnVoltarTexto}>Voltar ao Cardápio</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Colors.background,
    justifyContent: 'center', padding: 24,
  },
  content: { alignItems: 'center' },
  iconContainer: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#D1FAE5', alignItems: 'center',
    justifyContent: 'center', marginBottom: 20,
  },
  iconEmoji: { fontSize: 50 },
  titulo: { fontSize: 26, fontWeight: '900', color: Colors.text, textAlign: 'center', marginBottom: 8 },
  subtitulo: {
    fontSize: 14, color: Colors.textLight, textAlign: 'center',
    lineHeight: 20, marginBottom: 28, paddingHorizontal: 16,
  },
  numeroPedidoCard: {
    backgroundColor: Colors.primary, borderRadius: 20,
    paddingVertical: 20, paddingHorizontal: 32,
    alignItems: 'center', width: '100%', marginBottom: 20,
  },
  numeroPedidoLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: '500', marginBottom: 4 },
  numeroPedido: { fontSize: 52, fontWeight: '900', color: Colors.white, marginBottom: 8 },
  numeroPedidoInfo: { fontSize: 12, color: 'rgba(255,255,255,0.75)', textAlign: 'center' },
  infoGrid: {
    flexDirection: 'row', backgroundColor: Colors.card, borderRadius: 16,
    padding: 16, width: '100%', marginBottom: 24,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  infoItem: { flex: 1, alignItems: 'center', gap: 4 },
  infoEmoji: { fontSize: 22 },
  infoValor: { fontSize: 15, fontWeight: '800', color: Colors.text },
  infoLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '500' },
  infoSeparador: { width: 1, backgroundColor: Colors.border, marginVertical: 4 },
  btnAcompanhar: {
    backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 15,
    paddingHorizontal: 32, width: '100%', alignItems: 'center', marginBottom: 12,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnAcompanharTexto: { color: Colors.white, fontSize: 16, fontWeight: '800' },
  btnVoltar: { paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center' },
  btnVoltarTexto: { color: Colors.textLight, fontSize: 14, fontWeight: '600' },
});