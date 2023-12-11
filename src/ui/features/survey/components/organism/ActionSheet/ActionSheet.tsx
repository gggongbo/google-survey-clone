import React, {
  useRef,
  useMemo,
  forwardRef,
  useCallback,
  useImperativeHandle,
  ReactElement,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import ReanimatedBottomSheet from '@lib/reanimated-bottom-sheet';
import {useTheme} from '@lib/styled-components';
import {useAppDimensions} from '@ui/hooks/device';
import {useMount, useUpdateEffect} from '@ui/hooks/lifecycle';
import {usePrevious} from '@ui/hooks/state';

export type ActionSheetRef = ReanimatedBottomSheet & {
  hide: () => void;
  setVisible: (value: boolean) => void;
};

type ActionSheetProps = {
  isVisible: boolean;
  title?: string;
  item: () => ReactElement | null;
  itemHeight?: number;
  itemHeightPercent?: number;
  isScrollableItem: boolean;
  callbackNode: any;
  onHide: () => void;
  onClose: () => void;
};

const ActionSheet = forwardRef((props: ActionSheetProps, ref) => {
  const {
    isVisible,
    title,
    item,
    itemHeight: itemHeightProp,
    itemHeightPercent = 1,
    isScrollableItem,
    callbackNode,
    onHide,
    onClose,
  } = props;

  const theme = useTheme();
  const {height, IOSStatusBarHeight, AndroidStatusBarHeight} =
    useAppDimensions();

  const itemHeight = useMemo(
    () =>
      itemHeightProp ??
      (height - IOSStatusBarHeight - (AndroidStatusBarHeight ?? 0)) *
        itemHeightPercent,
    [
      AndroidStatusBarHeight,
      IOSStatusBarHeight,
      height,
      itemHeightPercent,
      itemHeightProp,
    ],
  );

  const RBSRef = useRef<ActionSheetRef>(null);
  const allowCloseEnd = useRef(false);
  const prevIsVisible = usePrevious(isVisible);

  useMount(() => {
    if (RBSRef?.current) {
      if (isVisible) RBSRef?.current.snapTo(0);
      else RBSRef.current.snapTo(1);
    }
  });

  useUpdateEffect(() => {
    if (isVisible !== prevIsVisible) {
      if (RBSRef?.current) {
        if (isVisible) RBSRef?.current.snapTo(0);
        else RBSRef.current.snapTo(1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  useImperativeHandle(ref, () => ({
    hide: () => {
      RBSRef?.current?.snapTo(1);
    },
  }));

  const renderHeader = useCallback(
    () => (
      <View
        style={[{backgroundColor: theme.color.appBackground}, styles.header]}>
        {!!title && (
          <Text style={[{color: theme.color.text[600]}, styles.text]}>
            {title}
          </Text>
        )}
      </View>
    ),
    [theme.color.appBackground, theme.color.text, title],
  );

  const renderContent = useCallback(() => {
    if (!isVisible) return false;
    return (
      <View
        style={[
          {backgroundColor: theme.color.appBackground},
          styles.contentContainer,
        ]}>
        {item?.()}
      </View>
    );
  }, [isVisible, item, theme.color.appBackground]);

  return (
    <ReanimatedBottomSheet
      ref={RBSRef}
      initialSnap={1}
      snapPoints={[itemHeight, -height]}
      enabledInnerScrolling={isScrollableItem}
      enabledContentTapInteraction={false}
      enabledContentGestureInteraction={false}
      renderHeader={renderHeader}
      renderContent={renderContent}
      callbackNode={callbackNode}
      onOpenStart={() => {
        allowCloseEnd.current = true;
      }}
      onCloseEnd={() => {
        if (!allowCloseEnd.current) return;
        onClose?.();
        onHide?.();
      }}
    />
  );
});

const styles = StyleSheet.create({
  header: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    top: 1,
    padding: 10,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    marginVertical: 2,
    fontSize: 16,
  },
});

export default ActionSheet;
