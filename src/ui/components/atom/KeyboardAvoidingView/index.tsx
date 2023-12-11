import React, {ReactElement} from 'react';
import {ViewProps} from 'react-native';

import KeyboardAvoidingView from './KeyboardAvoidingView';

import {useSelector} from '@lib/react-redux';
import {useAppDimensions, useKeyboardEvent} from '@ui/hooks/device';
import {DeviceSliceState, deviceActions} from '@ui/slices/device';
import {ReduxStore, useReduxDispatch} from '@ui/store';

type KeyboardAvoidingViewProps = ViewProps & {
  avoidingHeight?: number;
  useAware?: boolean;
  children?: ReactElement;
};

const KeyboardAvoidingViewContainer = (props: KeyboardAvoidingViewProps) => {
  const {avoidingHeight = 0, useAware = false, children} = props;

  const {isKeyboard, keyboardHeight} = useSelector<
    ReduxStore,
    DeviceSliceState
  >(({device}) => device);
  const {
    height: appHeight,
    IOSStatusBarHeight,
    AndroidStatusBarHeight,
  } = useAppDimensions();
  const dispatch = useReduxDispatch();

  useKeyboardEvent(({endCoordinates: {height}}) => {
    dispatch(deviceActions.setKeyboardHeight(Math.ceil(height)));
    dispatch(deviceActions.setIsKeyboard(!!height && height > 0));
  });

  return (
    <KeyboardAvoidingView
      height={Math.floor(
        appHeight - IOSStatusBarHeight - AndroidStatusBarHeight,
      )}
      extraHeight={Math.ceil(
        AndroidStatusBarHeight + IOSStatusBarHeight + avoidingHeight,
      )}
      isKeyboard={isKeyboard ?? false}
      keyboardHeight={keyboardHeight || 0}
      useAware={useAware}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingViewContainer;
