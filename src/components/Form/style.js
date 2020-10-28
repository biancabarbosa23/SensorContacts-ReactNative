import {StyleSheet} from "react-native";

export default StyleSheet.create({
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
    btnConfirm: {
        margin:20,
          backgroundColor: '#2BAE66FF',
          width: '90%',
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 7,
        },
        btnTextConfirm: {
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

  