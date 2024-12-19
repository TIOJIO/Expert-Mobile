// AccountScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustumHeader from './CustumHeader';
import { Avatar, Card, IconButton } from 'react-native-paper'; 

const AccountScreen = ({ navigation }) => {

  const handleCreate = async () => {
    //await AsyncStorage.removeItem('userToken');
    navigation.replace('create');
  };

  const handleLogin = async () => {
    //await AsyncStorage.removeItem('userToken');
    navigation.replace('Login');
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={{fontWeight:'bold',fontSize:30}}>Mon Profil</Text>
        <Card.Title
          title="Card Title"
          subtitle="vous n'est pas connecter"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        />
        <View style={styles.bloctxt} >
           <Text style={styles.txt}> Pour profiter de toutes les fonctionnalités de notre application, créez un compte ou connectez-vous.</Text>
        </View> 

        <View style={styles.buttonContainer}>
          <Button onPress={handleCreate} style={styles.btt} title="Créer un compte"  color="#007BFF" />&nbsp;&nbsp;&nbsp;
          <Button onPress={handleLogin} style={styles.btt} title="Se connecter"  color="#28A745" />
        </View>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer:{
    flexDirection:'row',
    width:"60%",
    display:'flex',

    justifyContent:'space-between',
    marginTop:50
  },
  bloctxt:{
    width:'90%',
    backgroundColor:'#003366',
    height:80,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:5
  },
  txt:{
    color:'white',
    margin:'auto'
  },
  btt:{
    borderRadius:10
  }
});

export default AccountScreen;
