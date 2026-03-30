import React from 'react';
import {
View,
Text,
TouchableOpacity,
ScrollView,
StyleSheet,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { categorias } from '@/constants/Cardapio';
interface FiltroCategoriaProps {
categoriaAtiva: string;
onChange: (cat: string) => void;
}
export function FiltroCategoria({ categoriaAtiva, onChange }:
FiltroCategoriaProps) {
return (
<ScrollView
horizontal
showsHorizontalScrollIndicator={false}
contentContainerStyle={styles.container}
>
{categorias.map((cat) => {
const ativo = categoriaAtiva === cat.id;
return (
<TouchableOpacity
key={cat.id}
style={[styles.chip, ativo && styles.chipAtivo]}
onPress={() => onChange(cat.id)}
accessibilityRole="button"
accessibilityLabel={`Filtrar por ${cat.label}`}
accessibilityState={{ selected: ativo }}
>
<Text style={styles.emoji}>{cat.emoji}</Text>
<Text style={[styles.label, ativo && styles.labelAtivo]}>
{cat.label}
</Text>
</TouchableOpacity>
);
})}
</ScrollView>
);
}
const styles = StyleSheet.create({
container: {
paddingHorizontal: 16,
paddingVertical: 12,
gap: 8,
},
chip: {
flexDirection: 'row',
alignItems: 'center',
gap: 6,
paddingHorizontal: 14,
paddingVertical: 8,
borderRadius: 20,
backgroundColor: Colors.card,
borderWidth: 1.5,
borderColor: Colors.border,
},
chipAtivo: {
backgroundColor: Colors.primary,
borderColor: Colors.primary,
},
emoji: {
fontSize: 14,
},
label: {
fontSize: 13,
fontWeight: '600',
color: Colors.textLight,
},
labelAtivo: {
color: Colors.white,
},
});