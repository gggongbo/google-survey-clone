import React, {ReactElement, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

import Icon from '@lib/expo/vector-icons';
import {useTheme} from '@lib/styled-components';

type CheckboxProps = {
  value: boolean;
  type: 'radio' | 'checkbox';
  size: number;
  disabled: boolean;
  customStyle: ViewStyle;
  disabledStyle: ViewStyle;
  children?: ReactElement;
  onPress: () => void;
};

const Checkbox = (props: CheckboxProps) => {
  const {
    value,
    type,
    size,
    disabled,
    customStyle,
    disabledStyle,
    onPress,
    children,
  } = props;

  const theme = useTheme();

  const memoizedStyles = useMemo(
    () => ({
      box: [
        styles.box,
        {
          width: size,
          height: size,
          borderColor: value ? theme.color.purple[300] : theme.color.gray[100],
          borderRadius: type !== 'checkbox' ? 100 : 0,
        },
        type === 'checkbox' && {
          backgroundColor: value
            ? theme.color.purple[300]
            : `${theme.color.appBackground}00`,
        },
      ],
      oval: [
        styles.oval,
        {
          width: size - 10,
          height: size - 10,
          backgroundColor: theme.color.purple[300],
        },
      ],
    }),
    [
      size,
      theme.color.appBackground,
      theme.color.gray,
      theme.color.purple,
      type,
      value,
    ],
  );

  return (
    <TouchableOpacity
      style={[styles.container, customStyle, disabled && disabledStyle]}
      disabled={disabled}
      onPress={onPress}>
      <View style={[memoizedStyles.box, disabled && disabledStyle]}>
        {type === 'checkbox' && !!value && (
          <Icon name="check" size={size - 3} color={theme.color.white} />
        )}
        {type === 'radio' && !!value && <View style={memoizedStyles.oval} />}
      </View>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  oval: {
    borderRadius: 100,
  },
});

export default Checkbox;
