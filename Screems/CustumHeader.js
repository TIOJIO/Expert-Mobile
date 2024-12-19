import React ,{Component,useEffect,useState} from 'react'
import { Text, View ,Image , TouchableOpacity,SafeAreaView , ScrollView} from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

 
const TypingAnimation = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const typingSpeed = 100; // Vitesse de saisie en millisecondes
  const textToType = 'Votre Recherche:'; // Texte à afficher avec l'animation

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



export default function CustumHeader({ head,text}){
  const navigation = useNavigation();
    const [active, setActive] = React.useState('');
    return(
      <View>
        {
            head==true?
        
          <View style={{backgroundColor:'white',width:'100%'}}>
          <View style={{height:100,marginTop:0,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',borderBottomLeftRadius:3,borderBottomRightRadius:3,width:'100%',alignItems:'center'}}>
            <View style={{marginLeft:20,marginTop:30}}>
                <TypingAnimation/>
              </View>
            <View style={{width: 85,marginRight:20,marginTop:30,flexDirection:'row',justifyContent:'space-between'}}>
                
            <TouchableOpacity onPress={()=>navigation.replace('SearchScreen')}>
                <Image
                  source={require('../images/search.png')}
                  style={{marginLeft:0, width: 40, height: 40,borderRadius:100,borderWidth:1,borderColor:'black',textAlign:'center' }}
                />  
             </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.replace('historique')}>
                <Image
                  source={require('../assets/his.png')}
                  style={{marginLeft:0, width: 40, height: 40,borderRadius:100,borderWidth:1,borderColor:'white',textAlign:'center' }}
                />  
                </TouchableOpacity>
            </View>
            
            
        </View>
            <Text style={{marginLeft:20,marginBottom:8,fontWeight:'bold'}}>" {text} "</Text>
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

   