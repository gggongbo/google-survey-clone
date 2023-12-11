import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import {useTheme} from '@lib/styled-components';
import {useMount} from '@ui/hooks/lifecycle';

type TextInputProps = {
  type?: 'solid';
  fontSize?: number;
  isFocus?: boolean;
  isActive?: boolean;
  customStyle?: ViewStyle;
} & RNTextInputProps;

export type TextInputRef = RNTextInput;

let currentTextInputRef:
  | (React.RefObject<TextInputRef> & {
      getIsFocus?: any;
    })
  | null = null;

const TextInput = forwardRef<TextInputRef, TextInputProps>((props, ref) => {
  const {
    type,
    fontSize,
    isFocus = false,
    isActive = false,
    customStyle,
    onFocus,
    onBlur,
    ...restProps
  } = props;
  const theme = useTheme();
  const textInputRef = useRef<RNTextInput>(null);

  useImperativeHandle(ref, () => textInputRef.current!, [textInputRef]);

  useMount(() => () => {
    if (currentTextInputRef === textInputRef) currentTextInputRef = null;
  });

  const onFocusWithTracking = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      currentTextInputRef = textInputRef;
      onFocus?.(e);
    },
    [onFocus],
  );

  const onBlurWithTracking = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      currentTextInputRef = null;
      onBlur?.(e);
    },
    [onBlur],
  );

  const memoizedStyles = useMemo(
    () => ({
      textInput: [
        styles.textInput,
        {
          backgroundColor:
            type === 'solid'
              ? theme.color.appBackground
              : `${theme.color.appBackground}00`,
          fontSize: fontSize || 16,
          borderBottomWidth: !isFocus && !isActive ? 0 : 2,
          borderBottomColor: isFocus
            ? theme.color.purple[300]
            : theme.color.gray[100],
        },
      ],
    }),
    [
      fontSize,
      isActive,
      isFocus,
      theme.color.appBackground,
      theme.color.gray,
      theme.color.purple,
      type,
    ],
  );

  return (
    <RNTextInput
      style={[memoizedStyles.textInput, customStyle]}
      ref={textInputRef}
      placeholderTextColor={theme.color.text[200]}
      onFocus={onFocusWithTracking}
      onBlur={onBlurWithTracking}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  );
});

const TextInputWithTracking = Object.assign(TextInput, {
  getCurrentFocusedTextInputRef() {
    return currentTextInputRef;
  },
});

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 10,
  },
});

export default TextInputWithTracking;
