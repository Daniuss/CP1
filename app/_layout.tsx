import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import { AppProvider } from '@/context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pedido/carrinho"
          options={{
            title: 'Meu Carrinho',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="pedido/confirmacao"
          options={{
            title: 'Pedido Realizado',
            headerBackVisible: false,
          }}
        />
      </Stack>
    </AppProvider>
  );
}
