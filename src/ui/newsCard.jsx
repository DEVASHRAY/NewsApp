import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React, {useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useNavigation} from '@react-navigation/native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {infoToast} from '../helpers/toast';

export default function NewsCard({
  item,
  rightSwipe = () => {},
  isPinnedNews,
  index,
  disableWebView,
}) {
  const {title, urlToImage, source, publishedAt, url} = item || {};

  const {name} = source || {};

  console.log("disableWebView" , disableWebView);

  if (!urlToImage || !title) {
    return <></>;
  }

  const swipableRef = useRef(null);

  const {navigate} = useNavigation();

  const handleCardTap = () => {
    if (!url) {
      infoToast({
        toastDescription:
          'Details not available at the moment.Please try after sometime',
      });
      return;
    }

    navigate('Browser', {url});
  };


  return (
    <TouchableWithoutFeedback onPress={handleCardTap} disabled={disableWebView}>
      <ImageBackground
        source={{uri: urlToImage}}
        resizeMode="cover"
        style={styles.newsCard}>
        <Swipeable
          ref={swipableRef}
          renderRightActions={() =>
            rightSwipe({item, isPinnedNews, index, swipableRef: swipableRef})
          }>
          <LinearGradient
            colors={['#1d1d1d', 'rgba(255,255,255,0)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.linearGradient}>
            <View style={[styles.content]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    styles.titleText,
                    isPinnedNews && {
                      flex: 0.9,
                    },
                  ]}
                  numberOfLines={3}>
                  {title || ''}
                </Text>

                {isPinnedNews && (
                  <Image
                    source={require('../assets/images/png/pinned.png')}
                    resizeMode="contain"
                    style={{width: 24, height: 24, flex: 0.1}}
                  />
                )}
              </View>

              <View style={[styles.description]}>
                <Text style={[styles.contentBottomText]}>{name}</Text>

                {publishedAt ? (
                  <Text style={[styles.contentBottomText]}>
                    {new Date(publishedAt).toLocaleDateString()}
                  </Text>
                ) : null}
              </View>
            </View>
          </LinearGradient>
        </Swipeable>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  newsCard: {
    height: 128,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
      borderRadius: 8,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: '#FFF',
    marginBottom: 16,
    overflow: 'hidden',
    borderRadius: 8,
  },
  titleText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  linearGradient: {
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  contentBottomText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '400',
  },
  content: {
    justifyContent: 'space-between',
    height: 118,
  },
});
