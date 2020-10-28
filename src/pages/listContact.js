import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 

import { useNavigation } from '@react-navigation/native'

import * as Contacts from 'expo-contacts'

import ListItems from '../components/ItemList'

export default function ListContact() {
  const navigation = useNavigation()  
  const [contatos , setContatos] = useState([])
  const [search, setSearch] = useState(false)
  const [name, setName] = useState(null)

  useEffect(() => {
    handlePermission()
  },[contatos])

  async function handlePermission(){
    if(search === true) return

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

  async function handleSearchContact(){

    if(name==''){
      setSearch(false)
      handlePermission()
      return
    }

    let id = null

    await contatos.map(function(item){
      if(item.firstName === name){
         id = item.id
      }
    })

    setSearch(true)
    
    if(id === null)
      return Alert.alert('Contato não existe!')

      const data = await Contacts.getContactByIdAsync(id);

      setContatos([data])
  }

  return (
    <SafeAreaView style={styles.screen}>
    <Text style={styles.textInformativo}>
      Listagem de Contatos
    </Text>
    <Text style={styles.textInformativoAcao}>
      Clique para alterar ou arraste para excluir
    </Text>
    <TouchableOpacity style = {styles.icon} 
    onPress={()=>navigation.reset({routes: [{ name: "NewContact" }]})}
    >
    <AntDesign name="pluscircle" size={30} color="black" />
    </TouchableOpacity>
    <View style={styles.form}>
        <Text>Nome: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setName(value)}
        >
        </TextInput>
        <TouchableOpacity 
    onPress={handleSearchContact}
    >
    <FontAwesome name="search" size={24} color="black" />
    </TouchableOpacity>
      </View>
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
  form: {
    width:'100%',
    flex: 1,
    maxHeight: 100,
    flexDirection: 'row',
    alignItems:"center",
    justifyContent: 'space-between', 
    paddingHorizontal: 15,
  },
  input: {
    marginTop: 10,
    backgroundColor: '#dddd',
    minWidth: '65%',
    height: 55,
    marginBottom: 10,
    color: '#222',
    fontSize: 15,
    borderRadius: 7,
    padding: 10,
  },
  divList: {
    flex: 1,
    width: '100%',
  },
})

