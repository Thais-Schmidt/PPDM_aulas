import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button, FlatList } from 'react-native';
import api from '../../services/api/api';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

export default function TodosClientes() {

    const navigation = useNavigation();
    const route = useRoute();

    let [flatListClientes, setflatListClientes] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [status, setStatus] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [isUpdate, setisUpdate] = useState(false); //Variavel de controle

    const navegaEditar = (pId, pNome, pIdade) => {
        navigation.navigate('EditarCliente', { id: pId, nome: pNome, idade: pIdade })
    }

    const exibeAlert = () => {
        setShowAlert(true)
    }

    const listarClientes = async () => {
        try {
            const response = await api.get('/clientes')
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        if ((error.request._response).includes('Failed')) {
                            console.log('Erro ao conecta coma API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config)
                });

            if (response != undefined) {
                if (response.data.length > 0) {
                    // console.log(response.data)
                    let temp = [];
                    for (let i = 0; i < response.data.length; i++) {
                        temp.push(response.data[i]);
                        setflatListClientes(temp);
                        // console.log(temp)
                    }
                    temp = [];
                } else {
                    setAlertMessage('Nenhum registro foi localizado!')
                    exibeAlert();
                    return;
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

    const deletarClientes = async (id) => {
        try {
            const response = await api.delete(`/clientes/${id}`)
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        if ((error.request._response).includes('Failed')) {
                            console.log('Erro ao conecta com a API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config)
                });

            if (response != undefined) {
                if (response.data[0].affectedRows > 0) {
                    setRefresh(prevState => !prevState);
                    setAlertMessage('Registro excluido com sucesso!')
                    exibeAlert();
                } else {
                    setAlertMessage('Nenhum registro foi localizado!')
                    exibeAlert();
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

    // useEffect(() => {
    //     if(route.params?.status) {
    //         setStatus(route.params.status)
    //     } 
    // }, [route.params?.status]);

    // useEffect(() => {
    //     listarClientes();
    // }, [status]);

    useFocusEffect(
        React.useCallback(() => {
            listarClientes();
        }, [refresh])
    );

    let listViewItem = (item) => {
        //console.log(item)
        return (

            <View style={styles.modeloCard}>

                <Text style={styles.textHeader}>ID:</Text>
                <Text style={styles.textValue}>{item.id}</Text>

                <Text style={styles.textHeader}>Nome:</Text>
                <Text style={styles.textValue}>{item.nome}</Text>

                <Text style={styles.textHeader}>Idade:</Text>
                <Text style={styles.textValue}>{item.idade}</Text>


                <View style={styles.containerButton}>
                    <TouchableOpacity
                        onPress={() => {
                            navegaEditar(item.id, item.nome, item.idade)
                        }}
                    >
                        <Text>
                            <FontAwesome5
                                name='edit'
                                color='#741b47'
                                size={24}
                            />
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Atenção!',
                                'Deseja realmente excluir esse registro?',
                                [
                                    {
                                        text: 'Sim',
                                        onPress: () => { deletarClientes(item.id) }

                                    },
                                    {
                                        text: 'Cancelar',
                                        onPress: () => { return }
                                    }
                                ]
                            )
                        }}
                    >
                        <Text>
                            <FontAwesome5
                                name='trash-alt'
                                color='#741b47'
                                size={24}
                            />
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }

    return (

        <View style={{ flex: 1 }}>

            <View>
                <FlatList
                    style={{ marginTop: 20 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={flatListClientes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listViewItem(item)}
                />
            </View>

            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        { text: 'OK', onPress: () => setAlertMessage(false) }
                    ]
                )
            )
            }

        </View >
    )
}

const styles = StyleSheet.create({
    containerButton: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        gap: 15
    },
    modeloCard: {
        backgroundColor: '#e2d4e0',
        marginBottom: 30,
        padding: 15,
        borderRadius: 10,
        elevation: 8,
    },
    textHeader: {
        color: '#741b47',
        fontSize: 12,
        fontWeight: 'bold',
        fontSize: 18,

    },
    textValue: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
        borderRadius: 4,
    }

});
