import React ,{Component,useEffect,useState} from 'react'
import { Text, View ,Image , TouchableOpacity,SafeAreaView , ScrollView} from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

 
const TypingAnimation = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const typingSpeed = 100; // Vitesse de saisie en millisecondes
  const textToType = 'Welcom back'; // Texte à afficher avec l'animation

  useEffect(() => {
    if (index < textToType.length) {
      setTimeout(() => {
        setText(text + textToType.charAt(index));
        setIndex(index + 1);
      }, typingSpeed);
    }
  }, [index]);

  return (
    <View >
      <Text style={{fontWeight:'bold',fontSize:20,color:'#003366'}}>{text}</Text>
    </View>
  );
};



export default function CustumHeader({ head}){
  const navigation = useNavigation();
    const [active, setActive] = React.useState('');
    return(
      <View>
        {
            head==true?
        
          <View style={{height:100,marginTop:0,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',borderBottomLeftRadius:3,borderBottomRightRadius:3,width:'100%',alignItems:'center'}}>
            <View style={{marginLeft:20,marginTop:30}}>
                <TypingAnimation/>
              </View>
            <View style={{marginRight:20,marginTop:30}}>

                <Image
                  source={require('../images/user.png')}
                  style={{marginLeft:110, width: 40, height: 40,borderRadius:100,borderWidth:1,borderColor:'white',textAlign:'center' }}
                />   
            </View>
            
        </View>
         :
         <View style={{height:100,marginTop:0,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',borderBottomLeftRadius:3,borderBottomRightRadius:3,width:'100%',alignItems:'center'}}>
            <View style={{marginLeft:20,marginTop:30}}>
              <TouchableOpacity onPress={()=>navigation.replace('HomeTabs')}>
              <Image
                  source={require('../images/back.png')}
                  style={{ width: 30, height: 30 }}
                />
                </TouchableOpacity>
              </View>
            
            
        </View>
     }
  </View>
      
    )
  }

   