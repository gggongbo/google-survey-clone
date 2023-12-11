import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from '@lib/expo/vector-icons';
import {FlatList, ScrollView} from '@lib/react-native-gesture-handler';
import {useTheme} from '@lib/styled-components';
import {TextInput} from '@ui/components/molecule';
import {SurveyAnswerAddButton} from '@ui/features/survey/components/atom';
import {componentActions} from '@ui/slices/component';
import {CurrentAnswer, Survey, surveyActions} from '@ui/slices/survey';
import {useReduxDispatch} from '@ui/store';

type SurveyAnswerProps = {
  surveyItem: Survey;
  surveyIndex: number;
  answerList?: string[];
  currentAnswer?: CurrentAnswer;
  inputFocusType?: string;
};

const SurveyAnswer = (props: SurveyAnswerProps) => {
  const {
    surveyItem,
    surveyIndex,
    answerList = [],
    currentAnswer,
    inputFocusType,
  } = props;
  const theme = useTheme();
  const dispatch = useReduxDispatch();

  const onFocus = useCallback(
    (item: string, index: number) => {
      dispatch(surveyActions.setIsListFocus(true));
      dispatch(surveyActions.setIsTitleFocus(false));
      dispatch(
        componentActions.setInputFocusType(
          `question${surveyIndex}answer${index}`,
        ),
      );
      dispatch(surveyActions.setFocusSurvey(surveyIndex));

      dispatch(
        surveyActions.setCurrentAnswer({
          surveyIndex,
          answerIndex: index,
          answer: item,
        }),
      );
    },
    [dispatch, surveyIndex],
  );

  const onBlur = useCallback(() => {
    if (!currentAnswer) return;
    dispatch(
      surveyActions.updateSurveyAnswerList({
        surveyIndex: currentAnswer.surveyIndex,
        answerIndex: currentAnswer.answerIndex,
        item:
          currentAnswer.answer.trim()?.length > 0
            ? currentAnswer.answer
            : `옵션 ${currentAnswer.answerIndex + 1}`,
      }),
    );
  }, [currentAnswer, dispatch]);

  const onAnswerChange = useCallback(
    (text: string, index: number) => {
      dispatch(
        surveyActions.setCurrentAnswer({
          surveyIndex,
          answerIndex: index,
          answer: text,
        }),
      );
    },
    [dispatch, surveyIndex],
  );

  const onDeletteButtonPress = useCallback(
    (index: number) => {
      if (!!answerList && answerList?.length < 2) return;
      dispatch(
        surveyActions.deleteSurveyAnswerList({
          surveyIndex,
          answerIndex: index,
        }),
      );
    },
    [answerList, dispatch, surveyIndex],
  );

  const onAddButtonPress = useCallback(() => {
    dispatch(
      surveyActions.addSurveyAnswerList({
        surveyIndex,
        answerIndex: answerList?.length || 0,
        item: `옵션 ${(answerList?.length || 0) + 1}`,
      }),
    );
  }, [answerList?.length, dispatch, surveyIndex]);

  const onEtcAddButtonPress = useCallback(() => {
    dispatch(
      surveyActions.updateSurveyList({
        index: surveyIndex,
        item: {...surveyItem, hasEtc: true},
      }),
    );
  }, [dispatch, surveyIndex, surveyItem]);

  const onEtcDeletteButtonPress = useCallback(() => {
    dispatch(
      surveyActions.updateSurveyList({
        index: surveyIndex,
        item: {...surveyItem, hasEtc: false},
      }),
    );
  }, [dispatch, surveyIndex, surveyItem]);

  const answerItem = useMemo(
    () => (
      <View
        style={[
          styles.itemContainer,
          {borderBottomColor: theme.color.gray[100]},
        ]}>
        <Text style={{color: theme.color.text[200]}}>
          {surveyItem?.type === 'input' ? '단답형 텍스트' : '장문형 텍스트'}
        </Text>
      </View>
    ),
    [surveyItem?.type, theme.color.gray, theme.color.text],
  );

  const etcItem = useMemo(
    () => (
      <View style={styles.listItemContainer}>
        <View
          style={[
            {borderColor: theme.color.gray[100]},
            surveyItem?.type === 'radio' ? styles.oval : styles.square,
          ]}
        />
        <Text style={[{color: theme.color.text[400]}, styles.etcText]}>
          기타
        </Text>
        {!!answerList && answerList?.length > 1 && (
          <TouchableOpacity
            style={styles.deleteListItemButton}
            onPress={onEtcDeletteButtonPress}>
            <Icon name="close" size={24} color={theme.color.gray[500]} />
          </TouchableOpacity>
        )}
      </View>
    ),
    [
      answerList,
      onEtcDeletteButtonPress,
      surveyItem?.type,
      theme.color.gray,
      theme.color.text,
    ],
  );

  const renderItem = useCallback(
    (renderItemProps: {item: string; index: number}) => {
      const {item, index} = renderItemProps;
      return (
        <View key={`${index}${item}`} style={styles.listItemContainer}>
          <View
            style={[
              {borderColor: theme.color.gray[100]},
              surveyItem?.type === 'radio' ? styles.oval : styles.square,
            ]}
          />
          <TextInput
            value={
              currentAnswer?.surveyIndex === surveyIndex &&
              currentAnswer?.answerIndex === index
                ? currentAnswer?.answer
                : item
            }
            // eslint-disable-next-line react-native/no-inline-styles
            customStyle={{
              padding: 5,
              flex: 1,
            }}
            fontSize={14}
            isFocus={inputFocusType === `question${surveyIndex}answer${index}`}
            onFocus={() => {
              onFocus(item, index);
            }}
            onBlur={onBlur}
            onChangeText={text => {
              onAnswerChange(text, index);
            }}
          />
          {!!answerList && answerList?.length > 1 && (
            <TouchableOpacity
              style={styles.deleteListItemButton}
              onPress={() => {
                onDeletteButtonPress(index);
              }}>
              <Icon name="close" size={24} color={theme.color.gray[500]} />
            </TouchableOpacity>
          )}
        </View>
      );
    },
    [
      answerList,
      currentAnswer?.answer,
      currentAnswer?.answerIndex,
      currentAnswer?.surveyIndex,
      inputFocusType,
      onAnswerChange,
      onBlur,
      onDeletteButtonPress,
      onFocus,
      surveyIndex,
      surveyItem?.type,
      theme.color.gray,
    ],
  );
  if (!surveyItem?.type) return null;

  return (
    <View style={styles.container}>
      {surveyItem?.type === 'radio' || surveyItem?.type === 'checkbox' ? (
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
            {!!surveyItem?.hasEtc && etcItem}
            <SurveyAnswerAddButton
              isRadio={surveyItem?.type === 'radio'}
              isEtcVisible={!surveyItem?.hasEtc}
              onAddButtonPress={onAddButtonPress}
              onEtcAddButtonPress={onEtcAddButtonPress}
            />
          </View>
        </ScrollView>
      ) : (
        answerItem
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    minHeight: 0,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  innesrScrollView: {
    flex: 1,
    flexGrow: 0,
    flexDirection: 'column',
  },
  itemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oval: {
    padding: 7,
    borderRadius: 100,
    marginRight: 10,
    borderWidth: 2,
  },
  square: {
    padding: 7,
    borderRadius: 3,
    marginRight: 10,
    borderWidth: 2,
  },
  deleteListItemButton: {
    padding: 7,
    borderRadius: 100,
  },
  etcText: {
    padding: 5,
    flex: 1,
  },
});

export default SurveyAnswer;
