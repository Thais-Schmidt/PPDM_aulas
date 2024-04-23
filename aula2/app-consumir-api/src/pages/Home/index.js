import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button, SafeAreaView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';



export default function App() {

    const navigation = useNavigation();

    const navegaPesquisaID = () => {
        navigation.navigate('DetalhesCliente');
    };

    const navegaNovoCliente = () => {
        navigation.navigate('NovoCliente')
    };

    const navegaTodosClientes = () => {
        navigation.navigate('TodosClientes')
    };

    return (

        <SafeAreaView style={styles.container}>

            <Text style={styles.text}>
                Schmidt :3
            </Text>

            <Button
                title='Pesquisar por ID'
                onPress={navegaPesquisaID}
                color={'#a64d79'}
            />

            <Button
                title='Cadastro novo cliente'
                onPress={navegaNovoCliente}
                color={'#a64d79'}
            />

            <Button
                title='Exibir todos os clientes'
                onPress={navegaTodosClientes}
                color={'#a64d79'}
            />


        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d5a6bd',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15
    },
    text: {
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 30,
        color: '#a64d79'
    }

});
