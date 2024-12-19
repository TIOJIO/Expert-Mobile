import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dialog, Portal, PaperProvider,ActivityIndicator,MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const hideDialog = () => setVisible(false);

  const handleLogin = async () => {
    
    if (!email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const user = await AsyncStorage.getItem(email);
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.password === password) {
           await AsyncStorage.setItem('SessionUser', user);

            setVisible(true)
            setTimeout(() => {
                setVisible(false)
                navigation.replace('SearchScreen')
            }, 2000);
        } else {
          alert('Mot de passe incorrect.');
        }
      } else {
         alert("L'utilisateur n'existe pas.");
      }
    } catch (error) {
        alert('Une erreur est survenue lors de la connexion.');
    }
  };

  return (
    <PaperProvider>
    <View style={styles.container}>
        <Image
            source={require('../assets/icon.png')}
            style={{marginLeft:110, width: 110, height: 110,borderRadius:100,borderWidth:1,borderColor:'white',textAlign:'center' }}
        />
      <Text style={styles.title}>Se connecter</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>

     <Portal >
          <Dialog style={{backgroundColor: 'transparent',elevation: 0}} visible={visible}  onDismiss={hideDialog}>
            <Dialog.Content>
                <ActivityIndicator size="large" color="#003366" />
            </Dialog.Content>
        
          </Dialog>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;