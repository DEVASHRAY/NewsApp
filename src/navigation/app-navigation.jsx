import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppNavigatorRouteParamList} from '../types/app-types';
import News from '../ui/news';
import Browser from '../ui/browser';
import SplashScreen from '../ui/SplashScreen';

const {Navigator, Screen} = createNativeStackNavigator();

export default function AppNavigation({loadSplashScreen}) {
  return (
    <Navigator
      initialRouteName={loadSplashScreen ? 'SplashScreen' : 'NewsFeed'}
      screenOptions={{headerShown: false}}>
      <Screen name="SplashScreen" component={SplashScreen} />
      <Screen name="NewsFeed" component={News} />
      <Screen name="Browser" component={Browser} />
    </Navigator>
  );
}
