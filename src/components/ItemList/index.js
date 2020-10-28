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

  return (
      <TouchableOpacity
        style={styles.container}
        onPress={handleNavigation}
      >
        <View style={styles.divInfo}>
          <Text style={styles.text}>Nome: {name}</Text>
          <Text style={styles.text}>Numero: {number} </Text>
        </View>
      </TouchableOpacity>
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
  textDesativado: {
    fontSize: 17,
    color: '#ff0000',
  },
  divInfo: {
    flex: 1,
    width: '70%',
    justifyContent: 'center',
  },
  buttonDesativar: {
    backgroundColor: '#ff0000',
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  buttonAtivar: {
    backgroundColor: '#2BAE66FF',
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
  },
})

export default ListItem