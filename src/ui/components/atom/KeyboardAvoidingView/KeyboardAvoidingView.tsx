import React, {ReactElement, useRef} from 'react';
import {
  Platform,
  StyleSheet,
  ViewProps,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';

import {ScrollView} from '@lib/react-native-gesture-handler';
import {KeyboardAwareScrollView} from '@lib/react-native-keyboard-aware-scroll-view';

type KeyboardAvoidingViewProps = ViewProps & {
  height: number;
  extraHeight: number;
  isKeyboard: boolean;
  keyboardHeight: number;
  useAware: boolean;
  children?: ReactElement;
};

const KeyboardAvoidingView = (props: KeyboardAvoidingViewProps) => {
  const {height, extraHeight, isKeyboard, keyboardHeight, useAware, children} =
    props;

  const keyboardAwareScrollViewRef = useRef(null);

  if (!useAware && Platform.OS === 'android')
    return (
      <RNKeyboardAvoidingView
        keyboardVerticalOffset={extraHeight}
        behavior="padding"
        enabled={isKeyboard}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </RNKeyboardAvoidingView>
    );

  return (
    <View
      style={
        Platform.OS === 'android' && {
          height: isKeyboard ? height - keyboardHeight - 50 : height,
        }
      }>
      <KeyboardAwareScrollView
        ref={keyboardAwareScrollViewRef}
        extraHeight={extraHeight}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        enableOnAndroid>
        <ScrollView
          horizontal
          bounces={false}
          scrollEnabled={false}
          nestedScrollEnabled
          style={[
            Platform.OS === 'android' && {height},
            styles.innesrScrollView,
          ]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  innesrScrollView: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default KeyboardAvoidingView;
