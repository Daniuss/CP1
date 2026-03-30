import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from
'react-native';
import { Colors } from '@/constants/Colors';
interface EstadoVazioProps {
 emoji: string;
 titulo: string;
 descricao: string;
 textoBotao?: string;
 onPressBotao?: () => void;
}
export function EstadoVazio({
 emoji,
 titulo,
 descricao,
 textoBotao,
 onPressBotao,
}: EstadoVazioProps) {
 return (
 <View style={styles.container}>
 <Text style={styles.emoji}>{emoji}</Text>
 <Text style={styles.titulo}>{titulo}</Text>
 <Text style={styles.descricao}>{descricao}</Text>
 {textoBotao && onPressBotao && (
 <TouchableOpacity style={styles.botao} onPress={onPressBotao}>
 <Text style={styles.botaoTexto}>{textoBotao}</Text>
 </TouchableOpacity>
 )}
 </View>
 );
}
const styles = StyleSheet.create({
 container: {
 flex: 1,
 alignItems: 'center',
 justifyContent: 'center',
 paddingHorizontal: 40,
 paddingVertical: 60,
 },
emoji: {
 fontSize: 64,
 marginBottom: 16,
 },
 titulo: {
 fontSize: 20,
 fontWeight: '700',
 color: Colors.text,
 textAlign: 'center',
 marginBottom: 8,
 },
 descricao: {
 fontSize: 14,
 color: Colors.textLight,
 textAlign: 'center',
 lineHeight: 20,
 marginBottom: 24,
 },
 botao: {
 backgroundColor: Colors.primary,
 paddingHorizontal: 24,
 paddingVertical: 12,
 borderRadius: 12,
 },
 botaoTexto: {
 color: Colors.white,
 fontWeight: '700',
 fontSize: 15,
 },
});
