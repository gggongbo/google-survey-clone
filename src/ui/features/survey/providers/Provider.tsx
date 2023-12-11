import React, {ReactElement, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {ActionSheet} from '@ui/features/survey/components/organism';
import {useActionSheet} from '@ui/features/survey/hooks';
import {ComponentSliceState} from '@ui/slices/component';
import {ReduxStore} from '@ui/store';

type ProviderProps = {
  children: ReactElement;
};

const Provider = (props: ProviderProps) => {
  const {children} = props;
  const actionSheetRef = useRef(null);
  const {actionSheetProps} = useSelector<ReduxStore, ComponentSliceState>(
    ({component}) => component,
  );

  useActionSheet().initialize(actionSheetRef);

  return (
    <View style={styles.container}>
      {children}
      <ActionSheet
        ref={actionSheetRef}
        title={actionSheetProps.title}
        item={actionSheetProps.item}
        itemHeight={actionSheetProps.itemHeight}
        itemHeightPercent={actionSheetProps.itemHeightPercent}
        isScrollableItem={actionSheetProps.isScrollableItem}
        onClose={actionSheetProps.onClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Provider;
