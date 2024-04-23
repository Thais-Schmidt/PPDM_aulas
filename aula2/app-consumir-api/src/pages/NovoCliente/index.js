import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button, } from 'react-native';

import api from '../../services/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const exibeAlert = () => {
        setShowAlert(true)
    }

    const salvarCliente = async () => {
        try {
            if (nome == '' || nome == null) {
                setAlertMessage('Preencha corretamente o nome:');
                exibeAlert();
                return;
            }
            if (isNaN(idade)) {
                setAlertMessage('O valor digitado para idade esta incorreto.');
                exibeAlert();
                return;
            }
            if (idade == '' || idade == null || idade < 1) {
                setAlertMessage('Informe uma idade maior que zero.');
                exibeAlert();
                return;
            }

            const response = await api.post('/clientes', { nome: nome, idade: Number(idade) })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        if ((error.request._response).includes('Failed')) {
                            console.log('Erro ao conectar com a API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config)
                });

            if (response != undefined) {
                if (response.data[0].affectedRows == 1) {
                    setAlertMessage('Cliente cadastrado com sucesso!');
                    exibeAlert();
                    setNome('');
                    setIdade(0);
                } else {
                    console.log("O registro não foi inserido. Tente novamente.")
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>
                Preencha os campos abaixo:
            </Text>

            <View>

                <Text style={styles.subtitle} >Nome do cliente:</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={nome}
                    onChangeText={setNome}
                />

            </View>

            <View>
                <Text style={styles.subtitle} >Idade do cliente:</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={idade.toString()} //recupera o texto 
                    onChangeText={setIdade} //recebe e armazena o que foi escrito no input 
                />
            </View>

            <TouchableOpacity

                onPress={() => { salvarCliente() }}
                style={styles.alingVH}>

                <Text style={styles.btnSalvar}> Salvar </Text>

            </TouchableOpacity>

            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        { text: 'OK', onPress: () => setAlertMessage(false) }
                    ]
                )
            )}

            <StatusBar style="auto" />

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffdf6',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#a64d79',
        marginBottom: 10
    },
    caixaDeTexto: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        width: 200,
        textAlign: 'center',
    },
    alingVH: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSalvar: {
        backgroundColor: '#a64d79',
        color: '#fafafa',
        height: 40,
        width: 120,
        textAlign: 'center',
        paddingTop: 6,
        fontSize: 20,
        borderRadius: 6
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 19,
        textAlign: 'center',
        color: '#4c1130'
    }

});
