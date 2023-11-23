import React, {useEffect} from 'react';
import {} from 'react-native';
import fetchAllNews from './api/allNews';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import AppContent from './AppContent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  // useEffect(() => {
  //   SplashScreen.show();
  // }, []);

 

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: '#FFF'}}>
        <AppContent />
        <Toast position="bottom" bottomOffset={20} />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default App;
