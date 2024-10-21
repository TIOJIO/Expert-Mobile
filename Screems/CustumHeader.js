import React ,{Component,useEffect,useState} from 'react'
import { Text, View ,Image , TouchableOpacity,SafeAreaView , ScrollView} from 'react-native';
 
const TypingAnimation = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const typingSpeed = 100; // Vitesse de saisie en millisecondes
  const textToType = 'Welcom back !!'; // Texte à afficher avec l'animation

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



export default function CustumHeader({title , isHome , navigation}){
    console.log(navigation);
    const [active, setActive] = React.useState('');
    return(
      <View style={{height:100,marginTop:0,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',borderBottomLeftRadius:3,borderBottomRightRadius:3,width:'100%',alignItems:'center'}}>
         <View style={{marginLeft:20,marginTop:30}}>
             <TypingAnimation/>
          </View>
         <View style={{marginRight:20,marginTop:30}}>
             <TouchableOpacity  >
             <Image
            source={require('../images/profil.jpg')}
            style={{marginLeft:110, width: 52, height: 52,borderRadius:100,borderWidth:1,borderColor:'white',textAlign:'center' }}
        />
             </TouchableOpacity>
        </View>
        
    </View>
    )
  }

   