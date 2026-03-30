import React from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 StyleSheet,
 Dimensions,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { ItemCardapio } from '@/constants/Cardapio';
const { width } = Dimensions.get('window');
interface CardItemProps {
 item: ItemCardapio;
 quantidade: number;
 onAdicionar: () => void;
 onRemover: () => void;
}
export function CardItem({ item, quantidade, onAdicionar, onRemover }:
CardItemProps) {
 return (
 <View style={[styles.card, !item.disponivel &&
styles.cardIndisponivel]}>
 <View style={styles.emoji}>
 <Text style={styles.emojiText}>{item.emoji}</Text>
 </View>
 <View style={styles.info}>
 <View style={styles.headerInfo}>
 <Text style={styles.nome}
numberOfLines={1}>{item.nome}</Text>
 {!item.disponivel && (
 <View style={styles.badgeIndisponivel}>
 <Text style={styles.badgeText}>Indisponível</Text>
 </View>
 )}
 </View>
 <Text style={styles.descricao} numberOfLines={2}>
 {item.descricao}
   </Text>
 <View style={styles.footer}>
 <View>
 <Text style={styles.preco}>
 R$ {item.preco.toFixed(2).replace('.', ',')}
 </Text>
 <Text style={styles.tempo}>⏱ ~{item.tempoEstimado}
min</Text>
 </View>
 {item.disponivel && (
 <View style={styles.controles}>
 {quantidade > 0 ? (
 <>
 <TouchableOpacity
 style={styles.btnRemover}
 onPress={onRemover}
 accessibilityLabel={`Remover ${item.nome}`}
 >
 <Text style={styles.btnRemoverText}>−</Text>
 </TouchableOpacity>
 <Text style={styles.quantidade}>{quantidade}</Text>
 <TouchableOpacity
 style={styles.btnAdicionar}
 onPress={onAdicionar}
 accessibilityLabel={`Adicionar ${item.nome}`}
 >
 <Text style={styles.btnAdicionarText}>+</Text>
 </TouchableOpacity>
 </>
 ) : (
 <TouchableOpacity
 style={styles.btnAdicionar}
 onPress={onAdicionar}
 accessibilityLabel={`Adicionar ${item.nome} ao
carrinho`}
 >
 <Text style={styles.btnAdicionarText}>+</Text>
 </TouchableOpacity>
 )}
  </View>
 )}
 </View>
 </View>
 </View>
 );
}
const styles = StyleSheet.create({
 card: {
 flexDirection: 'row',
 backgroundColor: Colors.card,
 borderRadius: 16,
 marginHorizontal: 16,
 marginVertical: 6,
 padding: 14,
 shadowColor: Colors.black,
 shadowOffset: { width: 0, height: 2 },
 shadowOpacity: 0.08,
 shadowRadius: 8,
 elevation: 3,
 },
 cardIndisponivel: {
 opacity: 0.55,
 },
 emoji: {
 width: 60,
 height: 60,
 borderRadius: 12,
 backgroundColor: Colors.background,
 alignItems: 'center',
 justifyContent: 'center',
 marginRight: 12,
 },
 emojiText: {
 fontSize: 30,
 },
 info: {
 flex: 1,
 },
 headerInfo: {
 flexDirection: 'row',
 alignItems: 'center',
  gap: 8,
 marginBottom: 2,
 },
 nome: {
 fontSize: 15,
 fontWeight: '700',
 color: Colors.text,
 flex: 1,
 },
 descricao: {
 fontSize: 12,
 color: Colors.textLight,
 marginBottom: 8,
 lineHeight: 16,
 },
 footer: {
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 },
 preco: {
 fontSize: 16,
 fontWeight: '800',
 color: Colors.primary,
 },
 tempo: {
 fontSize: 11,
 color: Colors.textMuted,
 marginTop: 1,
 },
 controles: {
 flexDirection: 'row',
 alignItems: 'center',
 gap: 10,
 },
 btnAdicionar: {
 backgroundColor: Colors.primary,
 width: 32,
 height: 32,
 borderRadius: 10,
 alignItems: 'center',
 justifyContent: 'center',
 },
   btnAdicionarText: {
 color: Colors.white,
 fontSize: 20,
 fontWeight: '700',
 lineHeight: 22,
 },
 btnRemover: {
 backgroundColor: Colors.border,
 width: 32,
 height: 32,
 borderRadius: 10,
 alignItems: 'center',
 justifyContent: 'center',
 },
 btnRemoverText: {
 color: Colors.text,
 fontSize: 20,
 fontWeight: '700',
 lineHeight: 22,
 },
 quantidade: {
 fontSize: 16,
 fontWeight: '700',
 color: Colors.text,
 minWidth: 20,
 textAlign: 'center',
 },
 badgeIndisponivel: {
 backgroundColor: '#FEE2E2',
 paddingHorizontal: 6,
 paddingVertical: 2,
 borderRadius: 6,
 },
 badgeText: {
 fontSize: 9,
 color: Colors.error,
 fontWeight: '600',
 },
});
