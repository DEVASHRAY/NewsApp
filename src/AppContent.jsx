import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import fetchAllNews from './api/allNews';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNewsStore} from './zustand/useNewsStore';
import News from './ui/news';
import {storeNewsLocally} from './helpers/localNewsStorage';
import {errorToast} from './helpers/toast';
import AppNavigation from './navigation/app-navigation';

export default function AppContent() {
  const updateNewsData = useNewsStore(({updateNewsData}) => updateNewsData);

  const [loadSplashScreen, setLoadSplashScreen] = useState(true);

  useEffect(() => {
    getRemoteNews();
  }, []);

  const getDataLocally = async () => {
    try {
      const value = await AsyncStorage.getItem('newsData');
      if (value !== null) {
        let data = JSON.parse(value || []);
        updateNewsData(data || []);
      } else {
        errorToast({
          toastTitle: 'Unable to fetch News at the moment.',
          toastDescription: 'Please try again after sometime',
        });
      }
    } catch (e) {
      // error reading value
      console.log('ASYNC STORAGE ERROR', err);
      errorToast({
        toastTitle: 'Unable to fetch News at the moment.',
        toastDescription: 'Please try again after sometime',
      });
    }
  };

  async function getRemoteNews() {
    try {
      let {articles = []} = await fetchAllNews({page: 1});
      storeNewsLocally(articles);
      updateNewsData(articles || []);
    } catch (err) {
      getDataLocally();
      console.log(err);
    } finally {
      SplashScreen.hide();
    }
  }

  return <AppNavigation loadSplashScreen={loadSplashScreen} />;
}
