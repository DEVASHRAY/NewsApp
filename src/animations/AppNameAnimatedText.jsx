import React, {useRef, useEffect} from 'react';
import {Animated, View, Text, StyleSheet, Easing} from 'react-native';
import {screenWidth} from '../utils/dimension';
import {SPLASH_SCREEN_TEXT_ANIMATION} from './animation-constant';

const text = 'Information Now';

const SplashAppNameAnimatedText = ({
  moveLogo,
  scaleHeaderLogo,
  scaleTitle,
  moveTitle,
  hideSplashScreenAnimation,
  startMoveAndFadeAnimation,
}) => {
  const moveLogoToLeft = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(moveLogoToLeft, {
      toValue: -175,
      duration: 1000,
      delay: 0,
      useNativeDriver: true,
      easing: Easing.ease,
    })?.start();
  }, []);

  const charAnimations = text.split('').map((_, index) => {
    const charAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(charAnim, {
        toValue: 1,
        duration: SPLASH_SCREEN_TEXT_ANIMATION,
        delay:
          (text.length - 1 - index) *
            (SPLASH_SCREEN_TEXT_ANIMATION / text.length) +
          550,
        useNativeDriver: true,
        easing: Easing.ease,
      })?.start(({finished}) => {
        if (finished) {
          startMoveAndFadeAnimation();
        }
      });
    }, [charAnim]);

    return charAnim;
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/png/appLogo.png')}
        style={[
          styles.animatedImage,
          {
            left: 160,
            transform: [
              {
                translateX: !hideSplashScreenAnimation
                  ? moveLogoToLeft
                  : moveLogo?.x,
              },
              {translateY: moveLogo?.y},
              {scale: scaleHeaderLogo},
            ],
          },
        ]}
      />

      {text.split('').map((char, index) => (
        <Animated.Text
          key={index + text}
          style={[
            styles.text,
            {
              opacity: charAnimations[index],
            },
            hideSplashScreenAnimation && {
              transform: [
                {translateY: moveTitle.y},
                {translateX: moveTitle.x},
                {scaleY: scaleTitle},
              ],
            },
          ]}>
          {char}
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginTop: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    // letterSpacing : 0.01,
    textAlign: 'left',
  },
  animatedImage: {
    width: 50,
    height: 50,
  },
});

export default SplashAppNameAnimatedText;
