import {Platform} from 'react-native';

import {
  NativeStackNavigationOptions,
  StackCardInterpolationProps,
} from '@lib/react-navigation/stack';

type StackScreenOption = NativeStackNavigationOptions & {
  cardStyleInterpolator?: (e: StackCardInterpolationProps) => any;
};

const fadeStackScreenOption: StackScreenOption | undefined = Platform.select({
  ios: {
    headerShown: false,
    animation: 'fade',
  },
  android: {
    headerShown: false,
    cardStyleInterpolator: ({current}: StackCardInterpolationProps) => ({
      cardStyle: {opacity: current.progress},
    }),
  },
});

const stackScreenOptions = {
  fade: fadeStackScreenOption,
};

export {stackScreenOptions};
