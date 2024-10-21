// ViewScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustumHeader from './CustumHeader';


const ViewScreen = () => {
  return (
    <View>
      <CustumHeader/>
    <View style={styles.container}>
      <Text>View Screen</Text>
    </View>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewScreen;
