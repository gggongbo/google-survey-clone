import React, {ReactElement} from 'react';
import {ViewProps, ViewStyle} from 'react-native';

import Checkbox from './Checkbox';

import {useUpdateEffect} from '@ui/hooks/lifecycle';
import {usePrevious} from '@ui/hooks/state';

type CheckboxProps = ViewProps & {
  value: boolean;
  type?: 'radio' | 'checkbox';
  size?: number;
  disabled?: boolean;
  customStyle?: ViewStyle;
  disabledStyle?: ViewStyle;
  onPress?: () => void;
  onValueChange?: (value: boolean) => void;
  children?: ReactElement;
};

const CheckboxContainer = (props: CheckboxProps) => {
  const {
    value,
    type = 'checkbox',
    size = 20,
    disabled = false,
    customStyle = {},
    disabledStyle = {},
    onPress = () => {},
    onValueChange = () => {},
    children,
  } = props;
  const prevValue = usePrevious(value);

  useUpdateEffect(() => {
    if (value !== prevValue) onValueChange?.(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, onValueChange]);

  return (
    <Checkbox
      value={value}
      type={type}
      size={size}
      disabled={disabled}
      customStyle={customStyle}
      disabledStyle={disabledStyle}
      onPress={onPress}>
      {children}
    </Checkbox>
  );
};

export default CheckboxContainer;
