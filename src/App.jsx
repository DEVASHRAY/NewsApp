import React, {useEffect} from 'react';
import {} from 'react-native';
import fetchAllNews from './api/allNews';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import AppContent from './AppContent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  useEffect(() => {
    SplashScreen.show();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#FFF'}}>
      <AppContent />
      <Toast position="bottom" bottomOffset={20} />
    </GestureHandlerRootView>
  );
}

export default App;
