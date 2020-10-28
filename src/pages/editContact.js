import React, { useEffect, useState } from "react";
import {
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

import styles from '../components/Form/style'

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
        <TouchableOpacity style={styles.btnConfirm}
            onPress={handleAlterContact}
        >
          <Text style={styles.btnTextConfirm}>Salvar Alterações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={()=> navigation.reset({routes: [{ name: "ListContact" }]})}
        >
          <Text style={styles.btnTextVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

