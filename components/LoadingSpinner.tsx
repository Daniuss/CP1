import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from
'react-native';
import { Colors } from '@/constants/Colors';
interface LoadingSpinnerProps {
mensagem?: string;
}
export function LoadingSpinner({ mensagem }: LoadingSpinnerProps) {
return (
<View style={styles.container}>
<ActivityIndicator size="large" color={Colors.primary} />
{mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
</View>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
gap: 16,
paddingVertical: 40,
},
mensagem: {
fontSize: 15,
color: Colors.textLight,
fontWeight: '500',
},
});