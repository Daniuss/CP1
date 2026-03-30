import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from
'react-native';
import { Colors } from '@/constants/Colors';
interface BotaoCarrinhoProps {
 totalItens: number;
 totalValor: number;
 onPress: () => void;
}
export function BotaoCarrinho({ totalItens, totalValor, onPress }:
BotaoCarrinhoProps) {
 if (totalItens === 0) return null;
 return (
 <TouchableOpacity
 style={styles.botao}
 onPress={onPress}
 activeOpacity={0.9}
 accessibilityLabel={`Ver carrinho com ${totalItens} itens`}
 >
 <View style={styles.badge}>
 <Text style={styles.badgeText}>{totalItens}</Text>
 </View>
 <Text style={styles.label}>🛒 Ver Carrinho</Text>
 <Text style={styles.valor}>R$ {totalValor.toFixed(2).replace('.',
',')}</Text>
 </TouchableOpacity>
 );
}
const styles = StyleSheet.create({
 botao: {
 position: 'absolute',
  bottom: 24,
 left: 20,
 right: 20,
 backgroundColor: Colors.primary,
 borderRadius: 16,
 flexDirection: 'row',
 alignItems: 'center',
 paddingVertical: 16,
 paddingHorizontal: 20,
 shadowColor: Colors.primary,
 shadowOffset: { width: 0, height: 4 },
 shadowOpacity: 0.4,
 shadowRadius: 12,
 elevation: 8,
 },
 badge: {
 backgroundColor: Colors.white,
 borderRadius: 12,
 minWidth: 24,
 height: 24,
 alignItems: 'center',
 justifyContent: 'center',
 paddingHorizontal: 6,
 marginRight: 10,
 },
 badgeText: {
 color: Colors.primary,
 fontWeight: '800',
 fontSize: 13,
 },
 label: {
 flex: 1,
 color: Colors.white,
 fontSize: 15,
 fontWeight: '700',
 },
 valor: {
 color: Colors.white,
 fontSize: 15,
 fontWeight: '800',
 },
});
