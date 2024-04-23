import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, } from 'react-native';

import api from './src/services/api/api';

export default function App() {

  const [cliente, setCliente] = useState([]);
  const [IDCli, setIDCli] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const getCliente = async (id) => {

    try {

      if (id > 0) {

        const response = await api.get(`/clientes/${id}`)

          .catch(function (error) {

            if (error.response) {

              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

            } else if (error.request) {

              if ((error.request._response).includes('Failed')) {
                console.log('Erro ao conectar a API.');
              }

            } else {

              console.log('Erro', error.message);

            }

          });

        if (response != undefined) {

          if (response.data.length === 0) {

            setCliente([])
            setShowAlert(true)

          } else {

            setCliente(response.data);

          }

        }

      

      } else {

        setCliente([]);

      }

    } catch (error) {

      console.error(error)

    }

  }

  return (

    <View style={styles.container}>

      <TextInput
        placeholder='Digite o ID desejado'
        style={styles.entradaTexto}
        keyboardType='numeric'
        onChangeText={setIDCli}
        value={IDCli}
      />

      <TouchableOpacity

        onPress={() => getCliente(IDCli)}
        style={styles.btn}

      >

        <Text style={{ color: 'white' }}>Pressione para pesquisar</Text>

      </TouchableOpacity>

      <Text>ID:</Text>
      <TextInput
        style={styles.box}
        value={cliente[0]?.id.toString()}
      />

      <Text>Nome:</Text>
      <TextInput
        style={styles.box}
        value={cliente[0]?.nome}
      />

      <Text>Idade:</Text>
      <TextInput
        style={styles.box}
        value={cliente[0]?.idade.toString()}
      />

      {
        showAlert &&
        (Alert.alert('Informação', 'Registro não foi encontrado na base de dados.',
          [
            { text: 'OK', onPress: () => setShowAlert(false) }
          ])
        )
      }

      <StatusBar style="auto" />

    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#7c7e9d',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 40,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 20,
  },
  entradaTexto: {
    backgroundColor: '#e2d4e0',
    height: 37,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#c4c7d7',
    height: 37,
    width: 120,
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 12,
  }
});
