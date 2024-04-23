import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './src/pages/Home';
import DetalhesCliente from './src/pages/DetalhesCliente';
import NovoCliente from './src/pages/NovoCliente';
import TodosClientes from './src/pages/TodosClientes';
import EditarCliente from './src/pages/EditarCliente';

const Stack = createNativeStackNavigator();


export default function App() {
  return (

    <SafeAreaProvider styles={styles.container}>

      <NavigationContainer>

        <Stack.Navigator>

          <Stack.Screen
            name='Home'
            component={Home}
          />

          <Stack.Screen
            name='DetalhesCliente'
            component={DetalhesCliente}
            options={{
              title: 'Detalhes Cliente'
            }}
          />

          <Stack.Screen
            name='NovoCliente'
            component={NovoCliente}
            options={{
              title: 'Novo Cliente'
            }}
          />

          <Stack.Screen
            name='TodosClientes'
            component={TodosClientes}
            options={{
              title: 'Exibir todos os Clientes'
            }}
          />

          <Stack.Screen
            name='EditarCliente'
            component={EditarCliente}
            options={{
              title: 'Editar clientes'
            }}
          />

        </Stack.Navigator>

      </NavigationContainer>

    </SafeAreaProvider>

  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfa2bd',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
