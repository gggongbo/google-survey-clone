import React, {useCallback} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {FlatList} from '@lib/react-native-gesture-handler';
import {useTheme} from '@lib/styled-components';
import {KeyboardAvoidingView} from '@ui/components/atom';
import {PreviewAnswer} from '@ui/features/preview/components/molecule';
import {useAppDimensions} from '@ui/hooks/device';
import {Preview} from '@ui/slices/preview';
import {Survey} from '@ui/slices/survey';

type PreviewListProps = {
  data: Survey[];
  previewList?: Preview[];
  titleHeight?: number;
};

const PreviewList = (props: PreviewListProps) => {
  const {data, previewList, titleHeight = 100} = props;
  const {
    height: appHeight,
    IOSStatusBarHeight,
    AndroidStatusBarHeight,
  } = useAppDimensions();
  const theme = useTheme();

  const renderItem = useCallback(
    (renderItemProps: {item: Survey; index: number}) => {
      const {item, index} = renderItemProps;
      if (!item) return null;

      return (
        <View
          key={`${index}${item}`}
          style={[
            {backgroundColor: theme.color.appBackground},
            styles.itemContainer,
          ]}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            {!!item.required && (
              <Text style={[{color: theme.color.red[200]}, styles.requireText]}>
                *
              </Text>
            )}
          </View>
          <PreviewAnswer
            previewList={previewList}
            type={item.type}
            previewIndex={index}
            answerList={item.answerList}
            hasEtc={item.hasEtc}
          />
        </View>
      );
    },
    [previewList, theme.color.appBackground, theme.color.red],
  );

  return (
    <KeyboardAvoidingView useAware avoidingHeight={titleHeight + 150}>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        style={{
          height:
            Platform.OS === 'ios'
              ? appHeight - IOSStatusBarHeight - titleHeight - 100
              : appHeight - AndroidStatusBarHeight - titleHeight - 30,
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    padding: 20,
    marginTop: 10,
    borderRadius: 6,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
  },
  requireText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default PreviewList;
