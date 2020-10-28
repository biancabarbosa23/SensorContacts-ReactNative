import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import * as Contacts from 'expo-contacts'

function ListItem({ data }) {
  const navigation = useNavigation()  
  const [name, setName] = useState(data.name)
  const [number, setNumber] = useState(data.phoneNumbers[0].number)

  async function handleNavigation(){
    AsyncStorage.setItem('contato', JSON.stringify(data))

    navigation.reset({
        routes: [{ name: "EditContact" }],
      });
  }

  async function handleDeleteContact(){
    Alert.alert('Alerta', 'Deseja mesmo apagar esse contato?', [
      { text: 'Não', style: 'cancel' },
      {
          text: 'Sim', onPress: async () => {
            await Contacts.removeContactAsync(data.id)
          }
      },
  ])
  }

  function handleRightActions(){
    return (
      <View>
              <TouchableOpacity style={styles.buttonDelete} onPress={handleDeleteContact}>
                  <Text style={styles.textButtonDelete}>Deletar</Text>
              </TouchableOpacity>
      </View>

  )
  }

  return (
    <Swipeable renderRightActions={handleRightActions}>
      <TouchableOpacity
        style={styles.container}
        onPress={handleNavigation}
      >
        <View style={styles.divInfo}>
          <Text style={styles.text}>Nome: {name}</Text>
          <Text style={styles.text}>Numero: {number} </Text>
        </View>
      </TouchableOpacity>
      </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 8,
  },
  text: {
    fontSize: 17,
  },
  divInfo: {
    flex: 1,
    width: '70%',
    justifyContent: 'center',
  },
  buttonDelete: {
    backgroundColor: '#ff0000',
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  textButtonDelete: {
    color: '#fff',
    fontSize: 18,
  },
})

export default ListItem