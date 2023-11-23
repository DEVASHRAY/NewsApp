import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useCallback, useLayoutEffect, useRef} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';

export default function Browser() {
  const {params} = useRoute();
  const navigation = useNavigation();

  const {url} = params || {};

  const webViewRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'News Details',
      headerStyle: {
        backgroundColor:  '#091750',
      },
      headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    });
  }, []);

  const loader = () => (
    <View style={styles.loadingOrErrorView}>
      <ActivityIndicator />
    </View>
  );

  return (
    <WebView
      ref={webViewRef}
      source={{uri: url}}
      renderLoading={loader}
      allowsBackForwardNavigationGestures
      startInLoadingState={true}
    />
  );
}

const styles = StyleSheet.create({
  loadingOrErrorView: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});
