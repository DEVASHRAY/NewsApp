import {useRef, useEffect} from 'react';
import {Dimensions, Animated, Easing} from 'react-native';
import {screenHeight, screenWidth} from '../utils/dimension';

export default function useHeaderTransitionAnimation() {
  const startAnimation = useRef(new Animated.Value(0)).current;

  const ref = useRef(null);

  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;

  const moveLogo = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const moveTitle = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const contentTransition = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  useEffect(() => {
    ref.current = Animated.parallel([
      Animated.delay(5000),
      Animated.timing(startAnimation, {
        toValue: -Dimensions.get('window').height + 70,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scaleLogo, {
        toValue: 0.8,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scaleTitle, {
        toValue: 0.6,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(moveLogo, {
        toValue: {
          x: -screenWidth / 2,
          y: screenHeight / 2 - 55,
        },
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(moveTitle, {
        toValue: {
          x: -screenWidth / 2 + 170,
          y: screenHeight / 2 - 55,
        },
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(contentTransition, {
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]);
  }, []);

  return {
    startAnimation,
    scaleLogo,
    scaleTitle,
    moveLogo,
    moveTitle,
    contentTransition,
    ref,
  };
}
