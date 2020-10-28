import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { useNavigation } from '@react-navigation/native'

import * as Contacts from 'expo-contacts'

export default function ListContact() {
  const navigation = useNavigation() 
  const [idContact, setIdContact] = useState(null)
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    handleGetContato()
  },[]);

  async function handleGetContato(){
    const contato = JSON.parse(await AsyncStorage.getItem('contato'))
    setIdContact(contato.id)
    setName(contato.name)
    setNumber(contato.phoneNumbers[0].digits)
  }

  async function handleAlterContact(){
    const contact = {
        id: idContact,
        [Contacts.Fields.FirstName]: name,
        phoneNumbers: [{number: number}],
      };

      
      const newData = await Contacts.updateContactAsync(contact);

      Alert.alert('Alterado com sucesso')
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.textInformativo}>Editar Contato</Text>
      <View style={styles.form}>
        <Text>Nome: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setName(value)}
        >
          {name}
        </TextInput>
        <Text>Numero: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setNumber(value)}
        >
          {number}
        </TextInput>
      </View>
      <View style={styles.divButton}>
        <TouchableOpacity style={styles.btnAlterar}
            onPress={handleAlterContact}
        >
          <Text style={styles.btnTextAlterar}>Salvar Alterações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={navigation.reset({routes: [{ name: "ListContact" }]})}
        >
          <Text style={styles.btnTextVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  textInformativo: {
    fontSize: 20,
    marginBottom: 40,
    marginTop: 40,
    alignSelf: "center",
    color: "#151515",
  },
  form: {
    flex: 1,
    justifyContent: 'center', 
  },
  input: {
    marginTop: 10,
    backgroundColor: '#dddd',
    minWidth: '80%',
    marginBottom: 20,
    color: '#222',
    fontSize: 20,
    borderRadius: 7,
    padding: 15,
  },
  divButton:{
    flex: 1,
    alignItems: 'center',
    width: "100%",
    },
    btnAlterar: {
        margin:20,
        backgroundColor: '#2BAE66FF',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
      },
      btnTextAlterar: {
        color: '#fff',
        fontSize: 20,
      },
      btnVoltar: {
        backgroundColor: '#FF0000',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
      },
      btnTextVoltar: {
        color: '#fff',
        fontSize: 20,
      },
});
