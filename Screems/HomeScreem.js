// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet,ScrollView ,Image} from 'react-native';
import CustumHeader from './CustumHeader';

const HomeScreen = () => {
  return ( 
    <View>
      <CustumHeader/>
      <ScrollView style={styles.container}>
         <Text style={{fontWeight:'bold',padding:10,fontSize:20}}>Home Screen</Text>

        <Image
            source={require('../images/flyer.jpeg')}
            style={{width: 'auto', height: 300,borderRadius:10,marginBottom:10 }}
        />

        <Image
            source={require('../images/devte.png')}
            style={{width: 'auto', height: 300,borderRadius:10,marginBottom:10 }}
        />

       <Image
            source={require('../images/flyer.jpeg')}
            style={{width: 'auto', height: 300,borderRadius:10,marginBottom:10 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft:10,
    marginRight:10
  },
});

export default HomeScreen;
