import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusPedido } from '@/hooks/usePedido';
import { Colors } from '@/constants/Colors';
interface StatusBadgeProps {
status: StatusPedido;
grande?: boolean;
}
const statusConfig: Record<StatusPedido, { label: string; emoji:
string; cor: string; fundo: string }> = {
aguardando: {
label: 'Aguardando',
emoji: '⏳',
cor: '#92400E',
fundo: '#FEF3C7',
},
preparando: {
label: 'Preparando',
emoji: '󰞽',
cor: '#1D4ED8',
fundo: '#DBEAFE',
},
pronto: {
label: 'Pronto!',
emoji: '✅',
cor: '#065F46',
fundo: '#D1FAE5',
},
entregue: {
label: 'Entregue',
emoji: '🎉',
cor: '#4B5563',
fundo: '#F3F4F6',
},
};
export function StatusBadge({ status, grande = false }:
StatusBadgeProps) {
const config = statusConfig[status];
return (
<View
style={[
styles.badge,
{ backgroundColor: config.fundo },
grande && styles.badgeGrande,
]}
>
<Text style={grande ? styles.emojiGrande : styles.emoji}>
{config.emoji}
</Text>
<Text
style={[
styles.texto,
{ color: config.cor },
grande && styles.textoGrande,
]}
>
{config.label}
</Text>
</View>
);
}
const styles = StyleSheet.create({
badge: {
flexDirection: 'row',
alignItems: 'center',
gap: 4,
paddingHorizontal: 10,
paddingVertical: 4,
borderRadius: 20,
alignSelf: 'flex-start',
},
badgeGrande: {
paddingHorizontal: 16,
paddingVertical: 8,
borderRadius: 12,
},
emoji: {
fontSize: 12,
},
emojiGrande: {
fontSize: 20,
},
texto: {
fontSize: 12,
fontWeight: '700',
},
textoGrande: {
fontSize: 16,
},
});