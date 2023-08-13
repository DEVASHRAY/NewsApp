import AsyncStorage from '@react-native-async-storage/async-storage';

export function storeNewsLocally(articles) {
  AsyncStorage.setItem('newsData', JSON.stringify(articles || []));
}

export function removeLocallyStoredNews() {
  AsyncStorage.removeItem('newsData');
}
