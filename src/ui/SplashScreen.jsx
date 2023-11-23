import React, {useMemo} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import News from './news';

import {
  useSplashFadeInAnimation,
  useHeaderTransitionAnimation,
  useSplashDetailedAnimation,
  SplashAppNameAnimatedText,
} from '../animations';

const splashScreenDescription = ['Discover', 'Read', 'Share'];

export default function SplashScreen() {
  const {
    borderRadiusAnim,
    circleOpacity,
    heightAnim,
    widthAnim,
    scaleLogo,
    showFadeInAnimation,
    logoOpacity,
  } = useSplashFadeInAnimation();

  const {
    contentTransition,
    moveLogo,
    moveTitle,
    scaleLogo: scaleHeaderLogo,
    scaleTitle,
    startAnimation,
    ref: headerTransitionRef,
  } = useHeaderTransitionAnimation();

  const {
    descriptionAnims,
    descriptionPoints,
    fadeAnim,
    hideSplashScreenAnimation,
    moveAnim,
    startMoveAndFadeAnimation,
  } = useSplashDetailedAnimation(headerTransitionRef);

  const splashScreenDescriptionAnimation = useMemo(
    () => (
      <>
        <View style={[styles.descriptionView]}>
          {splashScreenDescription?.map((text, index) => (
            <Animated.Text
              key={text}
              style={[
                styles.descriptionText,
                {
                  opacity: descriptionPoints[index],
                  transform: [{translateY: descriptionAnims[index]}],
                },
              ]}>
              {text}
            </Animated.Text>
          ))}
        </View>
      </>
    ),
    [hideSplashScreenAnimation],
  );

  if (showFadeInAnimation) {
    return (
      <View style={[styles.staticContainer]}>
        <Animated.Image
          source={require('../assets/images/png/appLogo.png')}
          style={[
            styles.animatedImage,
            {
              transform: [
                // {translateX: moveLogo.x},
                // {translateY: moveLogo.y},
                {scale: scaleLogo},
              ],
              opacity: logoOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.background,
            {borderRadius: borderRadiusAnim, opacity: circleOpacity},
            {width: widthAnim, height: heightAnim},
          ]}/>
      </View>
    );
  }

  return (
    <>
      <View style={[styles.container]}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              transform: [{translateY: startAnimation}],
            },
          ]}>
          <Animated.View style={styles.animatedSubContainer}>
            <SplashAppNameAnimatedText
              moveLogo={moveLogo}
              scaleHeaderLogo={scaleHeaderLogo}
              hideSplashScreenAnimation={hideSplashScreenAnimation}
              startMoveAndFadeAnimation={startMoveAndFadeAnimation}
              scaleTitle={scaleTitle}
              moveTitle={moveTitle}
            />

            {!hideSplashScreenAnimation && splashScreenDescriptionAnimation}
          </Animated.View>
        </Animated.View>

        <Animated.View
          style={[
            styles.animatedContentTransition,
            {
              transform: [{translateY: contentTransition}],
            },
          ]}>
          <News />
        </Animated.View>
      </View>
    </>
  );
}

export const styles = StyleSheet.create({
  staticContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    backgroundColor: '#091750',
    flex: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  animatedContainer: {
    flex: 1,
    backgroundColor: '#091750',
    zIndex: 1,
  },
  animatedSubContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  descriptionText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '400',
    marginTop: 10,
    textAlign: 'center',
    // fontStyle: 'italic',
  },
  descriptionView: {
    marginTop: 40,
  },
  animatedImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  animatedContentTransition: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.04)',
    zIndex: 0,
  },
});
