import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet ,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dialog, Portal, PaperProvider,ActivityIndicator,MD2Colors } from 'react-native-paper';

const CreateScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const hideDialog = () => setVisible(false);

  const handleSignUp = async () => {
    
    if (!username || !email || !password || !confirmPassword) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const user = { username, email, password };
      await AsyncStorage.setItem(email, JSON.stringify(user));
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
            navigation.navigate('Login');
        }, 2000);
       
    } catch (error) {
      alert('Une erreur est survenue lors de la création du compte.');
    }
  };

  return (
    <PaperProvider>
    <View style={styles.container}>
        <Image
            source={require('../assets/icon.png')}
            style={{marginLeft:110, width: 110, height: 110,borderRadius:100,borderWidth:1,borderColor:'white',textAlign:'center' }}
        />
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Créer un compte" onPress={handleSignUp} />
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

export default CreateScreen;
  