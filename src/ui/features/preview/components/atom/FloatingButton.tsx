import React, {ReactElement} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import {useTheme} from '@lib/styled-components';

type FloatingButtonProps = {
  onPress?: () => void;
  children: ReactElement;
  customStyle?: ViewStyle;
};

const FloatingButton = (props: FloatingButtonProps) => {
  const {onPress, children, customStyle} = props;
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: theme.color.appBackground,
          borderColor: theme.color.gray[100],
          shadowColor: theme.color.black,
        },
        styles.container,
        customStyle,
      ]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 10,
    right: 20,
    borderRadius: 6,
    borderWidth: 1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
});

export default FloatingButton;
