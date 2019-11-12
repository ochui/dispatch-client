import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

// grab navigation
import DrawerStack from './DrawerStack';
import AuthStack from './AuthStack';

// grab screens
import ModalHelp from '../screens/ModalHelp';
import ModalQRCode from '../screens/ModalQRCode';
import ModalTutorialBike from '../screens/ModalTutorialBike';
import ModalTutorial from '../screens/ModalTutorial';
import AuthCheck from '../screens/AuthCheck';

// grab modal routes (dynamic transitions)
import ModalRoutes from './ModalRoutes';

const StackNavigator = createStackNavigator(
  {
    DrawerStack,

    // Modals
    // /////////////////////////////////////////////////////////////////////////
    ModalHelp: {
      screen: ModalHelp,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ModalQRCode: {
      screen: ModalQRCode,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ModalTutorialBike: {
      screen: ModalTutorialBike,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ModalTutorial: {
      screen: ModalTutorial,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'DrawerStack',
    transitionConfig: ModalRoutes
  }
);

const App = createAppContainer(
  createSwitchNavigator(
    {
      App: {
        screen: StackNavigator,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      Auth: {
        screen: AuthStack,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      AuthCheck: {
        screen: AuthCheck,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      initialRouteName: 'AuthCheck'
    }
  )
);

export default App;
