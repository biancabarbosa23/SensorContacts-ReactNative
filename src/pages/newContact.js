import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native'

import styles from '../components/Form/style'

import * as Contacts from 'expo-contacts'

export default function NewContact() {
  const navigation = useNavigation() 
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);


  async function handleNewContact(){
    const contact = {
        [Contacts.Fields.FirstName]: name,
        phoneNumbers: [{number: number}],
      };

      
      const newData = await Contacts.addContactAsync(contact);

      Alert.alert('Adicionado com sucesso')
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.textInformativo}>Adicionar Novo Contato</Text>
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
            onPress={handleNewContact}
        >
          <Text style={styles.btnTextConfirm}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={()=>navigation.reset({routes: [{ name: "ListContact" }]})}
        >
          <Text style={styles.btnTextVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

  