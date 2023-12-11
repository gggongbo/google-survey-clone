import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  ReactElement,
  useMemo,
} from 'react';
import {
  BackHandler,
  Keyboard,
  NativeEventSubscription,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

import ActionSheet, {ActionSheetRef} from './ActionSheet';

import Animated from '@lib/react-native-reanimated';
import {useTheme} from '@lib/styled-components';
import {useMount} from '@ui/hooks/lifecycle';
import {ComponentSliceState, componentActions} from '@ui/slices/component';
import {ReduxStore, useReduxDispatch} from '@ui/store';

export type ActionSheetContainerRef = {
  setVisible: (value: boolean) => void;
};

export type ActionSheetProps = {
  title?: string;
  item: () => JSX.Element | ReactElement | null;
  itemHeight?: number;
  itemHeightPercent?: number;
  isScrollableItem: boolean;
  onClose?: () => void;
};

const ActionSheetContainer = forwardRef<
  ActionSheetContainerRef,
  ActionSheetProps
>((props, ref) => {
  const {
    title,
    item,
    itemHeight,
    itemHeightPercent,
    isScrollableItem,
    onClose = () => {},
  } = props;

  const {actionSheetVisible} = useSelector<ReduxStore, ComponentSliceState>(
    ({component}) => component,
  );
  const dispatch = useReduxDispatch();

  const theme = useTheme();

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const animatedValue = useRef<Animated.Value<number>>(
    new Animated.Value(1),
  ).current;

  useImperativeHandle(ref, () => ({
    setVisible: (value: boolean) => {
      if (value) {
        dispatch(componentActions.setActionSheetVisible(value));
      } else {
        actionSheetRef?.current?.hide();
        Keyboard.dismiss();
        setTimeout(() => {
          dispatch(componentActions.setActionSheetVisible(value));
        }, 100);
      }
    },
  }));

  useMount(() => {
    let backHandler: NativeEventSubscription | null = null;
    Keyboard.dismiss();
    backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (actionSheetRef?.current) actionSheetRef?.current.hide();
      return true;
    });

    return () => backHandler?.remove();
  });

  const interpolateOpacity = Animated.interpolateNode(animatedValue, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const memoizedStyles = useMemo(
    () => ({
      backdrop: {
        flex: 1,
        backgroundColor: `${theme.color.black}50`,
        opacity: interpolateOpacity,
      },
    }),
    [interpolateOpacity, theme.color.black],
  );

  return (
    <>
      {actionSheetVisible && (
        <Pressable
          style={styles.backdropContainer}
          onPress={() => {
            actionSheetRef?.current?.hide();
            Keyboard.dismiss();
            setTimeout(() => {
              dispatch(componentActions.setActionSheetVisible(false));
            }, 100);
          }}>
          <Animated.View style={memoizedStyles.backdrop} />
        </Pressable>
      )}
      <ActionSheet
        ref={actionSheetRef}
        isVisible={actionSheetVisible}
        title={title}
        item={item}
        itemHeight={itemHeight}
        itemHeightPercent={itemHeightPercent}
        isScrollableItem={isScrollableItem}
        callbackNode={animatedValue}
        onHide={() => dispatch(componentActions.setActionSheetVisible(false))}
        onClose={onClose}
      />
    </>
  );
});

const styles = StyleSheet.create({
  backdropContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default ActionSheetContainer;
