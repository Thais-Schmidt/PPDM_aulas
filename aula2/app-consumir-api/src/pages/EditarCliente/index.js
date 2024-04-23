import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button, } from 'react-native';
import api from '../../services/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarCliente() {
    const route = useRoute();
    const navigation =useNavigation();
    const [txtId, setTxtId] = useState(route.params?.id);
    const [txtIdade, setTxtIdade] = useState(route.params?.idade);
    const [txtNome, setTxtNome] = useState(route.params?.nome);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const exibeAlert = () => {
        setShowAlert(true)
    }

    const editarCliente = async () => {
        try {
            if (txtNome == '' || txtNome == null) {
                setAlertMessage('Preencha corretamente o nome:');
                exibeAlert();
                return;
            }
            if (isNaN(txtIdade)) {
                setAlertMessage('O valor digitado para idade esta incorreto.');
                exibeAlert();
                return;
            }
            if (txtIdade == '' || txtIdade == null || txtIdade < 1) {
                setAlertMessage('Informe uma idade maior que zero.');
                exibeAlert();
                return;
            }

            const response = await api.put(`/clientes/${txtId}`, { nome: txtNome, idade: Number(txtIdade) })
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
                if (response.data[0].changedRows == 1) {
                    setTxtId('');
                    setTxtNome('');
                    setTxtIdade('');
                    setAlertMessage('Cliente alterado com sucesso!');
                    exibeAlert();
                } else {
                    console.log("O registro não foi atualizado. Tente novamente.")
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.cardTitle}>

                <Text style={styles.title}>
                    Preencha os campos abaixo:
                </Text>

            </View>

            <View>

                <Text style={styles.subtitle}>Nome do cliente:</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={txtNome}
                    onChangeText={setTxtNome}
                />

            </View>

            <View>

                <Text style={styles.subtitle}>Idade do cliente:</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={txtIdade.toString()}
                    onChangeText={setTxtIdade}
                />

            </View>

            <View>

                <Text style={styles.subtitle}>ID:</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={txtId.toString()} //recupera o texto 
                    onChangeText={setTxtId} //recebe e armazena o que foi escrito no input 
                    readOnly
                />

            </View>

            <TouchableOpacity

                onPress={() => { editarCliente() }}
                style={styles.alingVH}>

                <Text> Salvar </Text>

            </TouchableOpacity>

            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        {
                            text: 'OK', onPress: () => {
                                setAlertMessage(false);
                                navigation.navigate('TodosClientes', {status:true})
                            }
                        }
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
    cardTitle: {
        borderRadius: 5,
        padding: 5,
    },
    title: {
        alignItems: 'center',
        fontSize: 26,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 20
    },
    caixaDeTexto: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        width: 300,
    },
    alingVH: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'pink',
        fontWeight: 'bold',
        fontSize: 20
    }
    // tyle={{ backgroundColor: 'black', , , , width: 140, height: 40, textAlign: 'center', justifyContent: 'center' }}
});
