import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import fetchAllNews from './api/allNews';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppContent() {
  useEffect(() => {
    getNews();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('newsData');
      if (value !== null) {
        console.log('newsData', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  async function getNews() {
    try {
      let data = await fetchAllNews();
      AsyncStorage.setItem('newsData', JSON.stringify(data?.articles || ''));
    } catch (err) {
      getData();
      console.log(err);
    } finally {
      SplashScreen.hide();
    }
  }

  return (
    <View>
      <Text>AppContent</Text>
    </View>
  );
}
