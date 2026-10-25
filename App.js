import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from './screens/TelaInicial';
import TelaDetalhes from './screens/TelaDetalhes';

const Pilha = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Pilha.Navigator initialRouteName="Home">
        <Pilha.Screen
          name="Home"
          component={TelaInicial}
          options={{ title: 'Receitas' }}
        />
        <Pilha.Screen
          name="Detalhes"
          component={TelaDetalhes}
          options={{ title: 'Detalhes' }}
        />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}
