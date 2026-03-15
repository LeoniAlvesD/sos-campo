import { Stack } from 'expo-router';
import { theme } from '../constants/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,

        // aplica fundo global em todas as telas
        contentStyle: {
          backgroundColor: theme.colors.secondary,
        },

        // estilo padrão de header
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },

        headerTintColor: '#ffffff',

        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      
      <Stack.Screen name="SOS_Campo" />

      <Stack.Screen
        name="acidente/[id]"
        options={{
          headerShown: true,
          title: 'Detalhes do Acidente',
        }}
      />

      {/* Esconde a pasta legal da navegação automática */}
      <Stack.Screen
        name="legal"
        options={{
          headerShown: false,
        }}
      />

    </Stack>
  );
}