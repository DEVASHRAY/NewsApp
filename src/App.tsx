import React, {useEffect} from 'react';
import {} from 'react-native';
import fetchAllNews from './api/allNews';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import AppContent from './AppContent';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.show();
  }, []);

  return (
    <>
      <AppContent />
      <Toast />
    </>
  );
}

export default App;
