import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'

import * as Contacts from 'expo-contacts'

import ListItems from '../components/ItemList'

export default function ListContact() {
  const navigation = useNavigation()  
  const [contatos , setContatos] = useState([])

  useEffect(() => {
    handlePermission()
  },[])

  async function handlePermission(){
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
          setContatos(data)
      }
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
    <Text style={styles.textInformativo}>
      Listagem de Contatos
    </Text>
    <Text style={styles.textInformativoAcao}>
      Clique para alterar
    </Text>
    <TouchableOpacity style = {styles.icon} 
    onPress={navigation.reset({routes: [{ name: "NewContact" }]})}
    >
    <AntDesign name="pluscircle" size={30} color="black" />
    </TouchableOpacity>
    <View style={styles.divList}>
      <FlatList
        data={contatos}
        key={(item) => item.id} 
        renderItem={({ item }) => (
          <ListItems data={item} />
        )}
        
      />
    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  icon:{
    position:'absolute',
    right: 1,
    marginTop: 35,
    marginRight: 20,
  },
  textInformativo: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'center',
    color: '#151515',
  },
  textInformativoAcao: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'center',
    color: '#151515',
  },
  divList: {
    flex: 1,
    width: '100%',
  },
})

