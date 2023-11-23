import {useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {screenHeight, screenWidth} from '../utils/dimension';
import {
  CIRCLE_BG_ANIMATION_DURATION,
  CIRCLE_BG_ANIMATION_LOGO_DURATION,
  CIRCLE_BG_ANIMATION_LOGO_OPACITY_DURATION,
} from './animation-constant';

export default function useSplashFadeInAnimation() {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const borderRadiusAnim = useRef(new Animated.Value(0)).current;
  const circleOpacity = useRef(new Animated.Value(0)).current;

  const scaleLogo = useRef(new Animated.Value(1)).current;

  const logoOpacity = useRef(new Animated.Value(1)).current;

  let startFadeInAnimation = useRef(null).current;

  const [showFadeInAnimation, setShowFadeInAnimation] = useState(true);

  useEffect(() => {
    const size = Math.max(screenWidth, screenHeight);

    startFadeInAnimation = Animated.parallel([
      Animated.timing(scaleLogo, {
        toValue: 0,
        duration: CIRCLE_BG_ANIMATION_LOGO_DURATION,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: CIRCLE_BG_ANIMATION_LOGO_OPACITY_DURATION,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(widthAnim, {
        toValue: size * 2,
        duration: CIRCLE_BG_ANIMATION_DURATION,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
      Animated.timing(heightAnim, {
        toValue: size * 2,
        duration: CIRCLE_BG_ANIMATION_DURATION,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
      Animated.timing(borderRadiusAnim, {
        toValue: size,
        duration: CIRCLE_BG_ANIMATION_DURATION,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
      Animated.timing(circleOpacity, {
        toValue: 1,
        duration: CIRCLE_BG_ANIMATION_DURATION,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
    ]);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      startFadeInAnimation?.start(({finished}) => {
        if (finished) {
          setShowFadeInAnimation(false);
        }
      });
    }, 400);
  }, []);

  return {
    widthAnim,
    heightAnim,
    borderRadiusAnim,
    circleOpacity,
    startFadeInAnimation,
    scaleLogo,
    showFadeInAnimation,
    logoOpacity,
  };
}
