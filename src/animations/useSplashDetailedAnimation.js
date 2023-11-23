import {useRef, useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {
  SPLASH_SCREEN_POINTS_DURATION,
  SPLASH_SCREEN_POINTS_DURATION_DELAY,
} from './animation-constant';

export default function useSplashDetailedAnimation(ref) {
  const [hideSplashScreenAnimation, setHideSplashScreenAnimation] =
    useState(false);

  const startDescriptionAnimation = useRef(null);
  const startDescriptionAnimationOpacity = useRef(null);

  const descriptionAnims = Array.from(
    {length: 3},
    (_, index) => useRef(new Animated.Value(0)).current,
  );

  const descriptionPoints = Array.from(
    {length: 3},
    (_, index) => useRef(new Animated.Value(0)).current,
  );

  const timer = useRef(null);

  useEffect(() => {
    startDescriptionAnimationOpacity.current = descriptionPoints.map(
      (anim, index) => {
        return Animated.sequence([
          Animated.delay(SPLASH_SCREEN_POINTS_DURATION_DELAY * index),
          Animated.timing(anim, {
            duration: SPLASH_SCREEN_POINTS_DURATION,
            toValue: 1,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]);
      },
    );

    startDescriptionAnimation.current = descriptionAnims.map((anim, index) => {
      return Animated.sequence([
        Animated.delay(SPLASH_SCREEN_POINTS_DURATION_DELAY * index),
        Animated.timing(anim, {
          duration: SPLASH_SCREEN_POINTS_DURATION,
          toValue: -40,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]);
    });

    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  function startMoveAndFadeAnimation() {
    Animated.parallel(startDescriptionAnimation.current)?.start();
    Animated.parallel(startDescriptionAnimationOpacity.current)?.start(
      ({finished: descriptionAnimFinished}) => {
        if (descriptionAnimFinished) {
          timer.current = setTimeout(() => {
            setHideSplashScreenAnimation(true);
            if ('start' in (ref?.current || {})) {
              ref?.current?.start();
            }
          }, 1000);
        }
      },
    );
  }

  return {
    hideSplashScreenAnimation,
    setHideSplashScreenAnimation,
    descriptionAnims,
    descriptionPoints,
    startDescriptionAnimation,
    startDescriptionAnimationOpacity,
    ref,
    startMoveAndFadeAnimation,
  };
}
