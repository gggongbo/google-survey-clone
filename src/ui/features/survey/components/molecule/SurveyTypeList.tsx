import React, {MutableRefObject, useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import Icon from '@lib/expo/vector-icons';
import {useTheme} from '@lib/styled-components';
import {ActionSheetRef} from '@ui/features/survey/components/organism';
import {Survey, SurveyTypeItem, surveyActions} from '@ui/slices/survey';
import {useReduxDispatch} from '@ui/store';

type SurveyTypeListProps = {
  data?: SurveyTypeItem[];
  surveyItem: Survey;
  surveyIndex: number;
  actionSheetRef: MutableRefObject<ActionSheetRef | null> | null;
};

const SurveyTypeList = (props: SurveyTypeListProps) => {
  const {data, surveyItem, surveyIndex, actionSheetRef} = props;
  const theme = useTheme();
  const dispatch = useReduxDispatch();

  const renderItem = useCallback(
    (params: {type: SurveyTypeItem; item: Survey; index: number}) => {
      const {type, item, index} = params;

      const prevType = surveyItem?.type;

      return (
        <Pressable
          key={`${index}${type}`}
          style={styles.itemContainer}
          onPress={() => {
            if (
              prevType !== 'radio' &&
              prevType !== 'checkbox' &&
              (type.value === 'radio' || type.value === 'checkbox')
            ) {
              dispatch(
                surveyActions.updateSurveyList({
                  index,
                  item: {
                    ...item,
                    type: type.value,
                    answerList: ['옵션 1'],
                    hasEtc: false,
                  },
                }),
              );
            } else {
              dispatch(
                surveyActions.updateSurveyList({
                  index,
                  item: {...item, type: type.value},
                }),
              );
            }
            actionSheetRef?.current?.setVisible(false);
          }}>
          <Icon
            name={type?.icon ?? 'message-question-outline'}
            size={20}
            color={theme.color.gray[400]}
          />
          <Text style={styles.text}>{type.name}</Text>
        </Pressable>
      );
    },
    [actionSheetRef, dispatch, surveyItem?.type, theme.color.gray],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item: typeItem}) =>
          renderItem({type: typeItem, item: surveyItem, index: surveyIndex})
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SurveyTypeList;
