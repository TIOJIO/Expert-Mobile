// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet ,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    navigation.replace('HomeTabs');
    /*if (username === 'user' && password === 'password') {
      await AsyncStorage.setItem('userToken', 'abc123');
      navigation.replace('HomeTabs');
    } else {
      alert('Invalid credentials');
    }*/
  };

  return (
    <View style={styles.container}>
        <Image
            source={require('../images/devte.png')}
            style={{marginLeft:110, width: 110, height: 110,borderRadius:100,borderWidth:1,borderColor:'white',textAlign:'center' }}
        />
        <Text style={{textAlign:'center',fontWeight:'bold',padding:15}}>Login Page</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        value={username}
        onChangeText={setUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin:'auto',
    padding: 16,
    width:'98%'
  },

  input: {
    width: 'auto',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    
  },
});

export default LoginScreen;
