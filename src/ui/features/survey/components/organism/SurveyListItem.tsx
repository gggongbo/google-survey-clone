import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import Icon from '@lib/expo/vector-icons';
import {useTheme} from '@lib/styled-components';
import {TextInput} from '@ui/components/molecule';
import {ActiveBar} from '@ui/features/survey/components/atom';
import {
  SurveyAnswer,
  SurveyMenu,
} from '@ui/features/survey/components/molecule';
import {componentActions} from '@ui/slices/component';
import {
  CurrentAnswer,
  Survey,
  SurveyTypeItem,
  surveyActions,
} from '@ui/slices/survey';
import {useReduxDispatch} from '@ui/store';

type SurveyListItemProps = {
  surveyItem: Survey;
  surveyIndex: number;
  typeInfo?: SurveyTypeItem;
  isListFocus?: boolean;
  inputFocusType?: string;
  focusSurvey?: number;
  currentAnswer?: CurrentAnswer;
  actionSheetCreate: (params: {item: Survey; index: number}) => void;
};

const SurveyListItem = (props: SurveyListItemProps) => {
  const {
    surveyItem,
    surveyIndex,
    typeInfo,
    isListFocus = false,
    inputFocusType,
    focusSurvey,
    currentAnswer,
    actionSheetCreate,
  } = props;
  const theme = useTheme();
  const dispatch = useReduxDispatch();

  const onQuestionFocus = useCallback(() => {
    dispatch(surveyActions.setIsListFocus(true));
    dispatch(surveyActions.setIsTitleFocus(false));
    dispatch(componentActions.setInputFocusType(`question${surveyIndex}`));
    dispatch(surveyActions.setFocusSurvey(surveyIndex));
  }, [dispatch, surveyIndex]);

  const onQuestionChange = useCallback(
    (text: string) => {
      dispatch(
        surveyActions.updateSurveyList({
          index: surveyIndex,
          item: {...surveyItem, question: text || '제목 없는 질문'},
        }),
      );
    },
    [dispatch, surveyIndex, surveyItem],
  );

  const onRequireChange = useCallback(() => {
    dispatch(
      surveyActions.updateSurveyList({
        index: surveyIndex,
        item: {...surveyItem, required: !surveyItem.required},
      }),
    );
  }, [dispatch, surveyIndex, surveyItem]);

  const onCopyButtonPress = useCallback(() => {
    dispatch(surveyActions.addSurveyList(surveyItem));
  }, [dispatch, surveyItem]);

  const onDeleteButtonPress = useCallback(() => {
    dispatch(surveyActions.deleteSurveyList(surveyIndex));
  }, [dispatch, surveyIndex]);

  return (
    <View
      style={[{backgroundColor: theme.color.purple[300]}, styles.container]}>
      <ActiveBar isActive={isListFocus && focusSurvey === surveyIndex} />
      <View
        style={[
          {backgroundColor: theme.color.appBackground},
          styles.itemContainer,
        ]}>
        <TextInput
          value={surveyItem.question}
          fontSize={16}
          isFocus={inputFocusType === `question${surveyIndex}`}
          isActive={isListFocus && focusSurvey === surveyIndex}
          onFocus={onQuestionFocus}
          onChangeText={onQuestionChange}
        />
        <Pressable
          style={[{borderColor: theme.color.gray[100]}, styles.typeButton]}
          onPress={() => {
            actionSheetCreate({item: surveyItem, index: surveyIndex});
          }}>
          <Icon
            name={typeInfo?.icon ?? 'message-question-outline'}
            size={20}
            color={theme.color.gray[400]}
          />
          <Text style={styles.typeText}>{typeInfo?.name}</Text>
        </Pressable>
        <SurveyAnswer
          surveyItem={surveyItem}
          surveyIndex={surveyIndex}
          answerList={surveyItem?.answerList}
          currentAnswer={currentAnswer}
          inputFocusType={inputFocusType}
        />
        <SurveyMenu
          required={surveyItem.required}
          onRequireChange={onRequireChange}
          onCopyButtonPress={onCopyButtonPress}
          onDeleteButtonPress={onDeleteButtonPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 6,
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    marginTop: 10,
    borderBottomRightRadius: 6,
  },
  typeButton: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 10,
  },
  typeText: {
    marginLeft: 5,
  },
});

export default SurveyListItem;
