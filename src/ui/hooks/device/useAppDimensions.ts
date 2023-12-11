import {Dimensions, StatusBar, Platform} from 'react-native';

import {
  getStatusBarHeight,
  initialWindowMetrics,
} from '@lib/react-native-safe-area';

const useAppDimensions = () => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const IOSStatusBarHeight = getStatusBarHeight(true);
  const AndroidStatusBarHeight =
    Platform.OS !== 'android'
      ? 0
      : initialWindowMetrics?.insets.top || StatusBar.currentHeight || 0;
  return {width, height, IOSStatusBarHeight, AndroidStatusBarHeight};
};

export default useAppDimensions;
