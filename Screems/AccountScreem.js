// AccountScreen.js
import React , {useEffect,useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustumHeader from './CustumHeader';
import { Avatar, Card, IconButton } from 'react-native-paper'; 

const AccountScreen = ({ navigation }) => {
   const [sessionUser, setSessionUser] = useState(null);
   useEffect(() => {
    const getSessionUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('SessionUser');
        if (userData !== null) {
          setSessionUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };
    getSessionUser();
  }, []); 

  const handleCreate = async () => {
    navigation.replace('create');
  };

  const handleLogin = async () => {
    navigation.replace('Login');
  };

  return (
    <View>
      {sessionUser==null?
      <View style={styles.container}>
        <Text style={{fontWeight:'bold',fontSize:30,marginBottom: 20,}}>Mon Profil</Text>
        <Text style={{fontWeight:'bold',fontSize:20,marginBottom: 20,}}> Vous n'êtes pas connecté </Text>
        
        <View style={styles.bloctxt} >
           <Text style={styles.txt}> Pour profiter de toutes les fonctionnalités de notre application, créez un compte ou connectez-vous.</Text>
        </View> 

        <View style={styles.buttonContainer}>
          <Button onPress={handleCreate} style={styles.btt} title="Créer un compte"  color="#007BFF" />&nbsp;&nbsp;&nbsp;
          <Button onPress={handleLogin} style={styles.btt} title="Se connecter"  color="#28A745" />
        </View>
      
      </View>
         :
      <View style={styles.container}>
        <Text style={{fontWeight:'bold',fontSize:30,marginBottom: 20,}}>Mon Profil</Text>
        <Text style={{fontWeight:'bold',fontSize:20,marginBottom: 20,}}> Vous êtes connecté </Text>

        <Card.Title
          title={sessionUser.username}
          subtitle={sessionUser.email}
          left={(props) => <Avatar.Icon {...props} icon="user" />}
        />

      <View style={styles.buttonContainer}>
          <Button onPress={handleCreate} style={styles.btt} title="Nouveau compte"  color="#007BFF" />&nbsp;&nbsp;&nbsp;
          <Button onPress={handleLogin} style={styles.btt} title="Se connecter"  color="#28A745" />
        </View>
      </View>
      }
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
