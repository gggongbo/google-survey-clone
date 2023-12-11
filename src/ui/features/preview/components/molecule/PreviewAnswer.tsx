import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {FlatList, ScrollView} from '@lib/react-native-gesture-handler';
import {useTheme} from '@lib/styled-components';
import {Checkbox, TextInput} from '@ui/components/molecule';
import {Preview, previewActions} from '@ui/slices/preview';
import {useReduxDispatch} from '@ui/store';

type PreviewAnswerProps = {
  previewList?: Preview[];
  type: 'input' | 'area' | 'radio' | 'checkbox';
  previewIndex: number;
  answerList?: string[];
  hasEtc?: boolean;
};

/* eslint-disable react-native/no-inline-styles */
const PreviewAnswer = (props: PreviewAnswerProps) => {
  const {previewList, type, previewIndex, answerList, hasEtc = false} = props;
  const theme = useTheme();
  const dispatch = useReduxDispatch();

  const renderItem = useCallback(
    (renderItemProps: {item: string; index: number}) => {
      const {item, index} = renderItemProps;
      const previewHasEtc = previewList?.[previewIndex]?.hasEtc;

      if (!item) return null;
      return (
        <View key={`${index}${item}`} style={styles.listItemContainer}>
          <Checkbox
            value={
              type === 'radio'
                ? previewList?.[previewIndex]?.answer === item
                : previewList?.[previewIndex]?.answerList?.includes(item) ??
                  false
            }
            size={20}
            type={type === 'radio' ? 'radio' : 'checkbox'}
            onPress={() => {
              if (type === 'radio') {
                dispatch(
                  previewActions.setPreviewRadioAnswerList({
                    previewIndex,
                    item,
                  }),
                );
                if (previewHasEtc) {
                  dispatch(
                    previewActions.setPreviewHasEtc({
                      index: previewIndex,
                      item: false,
                    }),
                  );
                }
              } else {
                dispatch(
                  previewActions.setPreviewCheckboxAnswerList({
                    previewIndex,
                    item,
                  }),
                );
              }
            }}
          />
          <Text style={styles.answerText}>{item}</Text>
        </View>
      );
    },
    [dispatch, previewIndex, previewList, type],
  );

  const etcItem = useMemo(() => {
    const previewHasEtc = previewList?.[previewIndex]?.hasEtc;

    return (
      <View style={styles.etcItemContainer}>
        <Checkbox
          value={previewHasEtc ?? false}
          size={20}
          type={type === 'radio' ? 'radio' : 'checkbox'}
          onPress={() => {
            if (type === 'radio') {
              dispatch(
                previewActions.resetPreviewRadioAnswerList(previewIndex),
              );
              dispatch(
                previewActions.setPreviewHasEtc({
                  index: previewIndex,
                  item: !previewHasEtc,
                }),
              );
            } else {
              dispatch(
                previewActions.setPreviewHasEtc({
                  index: previewIndex,
                  item: !previewHasEtc,
                }),
              );
            }
          }}
        />
        <Text style={styles.answerText}>기타 :</Text>
        <TextInput
          fontSize={14}
          customStyle={{
            flex: 1,
            marginLeft: 20,
            padding: 0,
            borderBottomWidth: 2,
            borderBottomColor: theme.color.gray[100],
          }}
        />
      </View>
    );
  }, [dispatch, previewIndex, previewList, theme.color.gray, type]);

  return (
    <View style={styles.container}>
      {type === 'radio' || type === 'checkbox' ? (
        <ScrollView
          horizontal
          bounces={false}
          scrollEnabled={false}
          nestedScrollEnabled
          style={styles.innesrScrollView}>
          <View style={styles.listContainer}>
            <FlatList
              data={answerList}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
            />
            {!!hasEtc && etcItem}
          </View>
        </ScrollView>
      ) : (
        <TextInput
          placeholder="내 답변"
          customStyle={{
            borderBottomWidth: 2,
            borderBottomColor: theme.color.gray[100],
          }}
          maxLength={type === 'input' ? 10 : 100}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    minHeight: 0,
  },
  innesrScrollView: {
    flex: 1,
    flexGrow: 0,
    flexDirection: 'column',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  listItemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  etcItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerText: {
    flex: 1,
    marginLeft: 10,
  },
});

export default PreviewAnswer;
