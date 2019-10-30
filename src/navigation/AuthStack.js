import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: 'none'
  }
);

export default AuthStack;
