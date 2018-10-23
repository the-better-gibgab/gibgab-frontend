import React from 'react';
import { ThemeProvider, Button, colors } from 'react-native-elements';
import { View } from 'react-native';
import ThemePreview from './components/ThemePreview/ThemePreview';
import { theme } from './config/theme';
import { Provider } from 'react-redux';
import store from './store/index';
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import Authentication from './screens/Authentication/Authentication';
import Theme from './screens/Theme/Theme';
import { createStackNavigator } from 'react-navigation';

//Stupid expo font hack
import { Font, AppLoading } from 'expo';

const RootStack = createStackNavigator(
  {
    Authentication: {
      screen: Authentication,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    Theme: {
      screen: Theme,
    },
  },
  {
    initialRouteName: 'Theme',
  }
);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      OpenSans: require('./assets/fonts/OpenSans.ttf'),
      ProximaNova: require('./assets/fonts/ProximaNova.ttf'),
    });
    this.setState({ loading: false });
  }

  render() {
    // STUPID STUPID EXPO FONT HACK
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RootStack />
        </ThemeProvider>
      </Provider>
    );
  }
}
