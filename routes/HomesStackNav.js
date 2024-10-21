import { createStackNavigator } from 'react-navigation-stack';
 import { createAppContainer } from 'react-navigation';
import Home from '../Screems/Home';
import Colors from '../Constant/Colors';





const screens={
  Home:{
    screen:Home,
    navigationOptions:{
   headerShown:false,
    title:'Home',
    }
},
 /* LoadingPage:{
    screen:LoadingPage,
    navigationOptions:{
      headerShown:false,
    }
},
Welcom:{
  screen:Welcom,
  navigationOptions:{
    headerShown:false,
  }
}, */
   
   
}

const defaultNavigationOptions = {
   defaultNavigationOptions:{
    headerStyle:{
      backgroundColor:'#003366'
    },
    headerTintColor: Colors.white,
    headerTitleStyle:{
      fontWeight:'bold',
    },
    

   }
}

  const StackNav = createStackNavigator(screens ,defaultNavigationOptions);

 export default createAppContainer(StackNav);

