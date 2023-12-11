import React, {useCallback, useMemo} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';

import Icon from '@lib/expo/vector-icons';
import {StackScreenProps} from '@lib/react-navigation/stack';
import {useSelector} from '@lib/react-redux';
import {useTheme} from '@lib/styled-components';
import {SurveyList, SurveyTitle} from '@ui/features/survey/components/organism';
import Provider from '@ui/features/survey/providers/Provider';
import {AppNavigatorParamList, routes} from '@ui/navigations/AppNavigator/type';
import {ComponentSliceState} from '@ui/slices/component';
import {surveyActions, SurveySliceState} from '@ui/slices/survey';
import {ReduxStore, useReduxDispatch} from '@ui/store';

type SurveyScreenProps = StackScreenProps<AppNavigatorParamList, routes.SURVEY>;

const SurveyScreen = (props: SurveyScreenProps) => {
  const {navigation} = props;
  const theme = useTheme();
  const survey = useSelector<ReduxStore, SurveySliceState>(
    ({survey: reduxSurvey}) => reduxSurvey,
  );
  const {inputFocusType} = useSelector<ReduxStore, ComponentSliceState>(
    ({component}) => component,
  );

  const dispatch = useReduxDispatch();

  const navigateToPreviewScreen = () => {
    navigation.navigate(routes.PREVIEW);
  };

  const onAddButtonPress = useCallback(() => {
    dispatch(
      surveyActions.addSurveyList({
        question: '제목없는 질문',
        type: 'radio',
        answerList: ['옵션 1'],
      }),
    );
  }, [dispatch]);

  const memoizedStyles = useMemo(
    () => ({
      floatingButtonContainer: [
        styles.floatingButtonContainer,
        {
          bottom: Platform.OS === 'ios' ? 100 : 10,
          backgroundColor: theme.color.appBackground,
          borderColor: theme.color.gray[100],
          shadowColor: theme.color.black,
        },
      ],
    }),
    [theme.color.appBackground, theme.color.black, theme.color.gray],
  );

  return (
    <Provider>
      <View
        style={[{backgroundColor: theme.color.purple[100]}, styles.container]}>
        <SurveyTitle
          title={survey?.title}
          description={survey?.description}
          isActive={survey?.isTitleFocus}
          isTitleFocus={inputFocusType === 'title'}
          isDescriptionFocus={inputFocusType === 'description'}
        />
        <View style={styles.listContainer}>
          <SurveyList
            data={survey?.surveyList}
            typeList={survey?.typeList}
            isListFocus={survey?.isListFocus}
            inputFocusType={inputFocusType}
            focusSurvey={survey?.focusSurvey}
            titleHeight={survey?.titleHeight}
            currentAnswer={survey?.currentAnswer}
          />
        </View>
        <View style={memoizedStyles.floatingButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={onAddButtonPress}>
            <Icon name="plus" size={24} color={theme.color.gray[500]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.previewButton}
            onPress={navigateToPreviewScreen}>
            <Icon name="eye" size={24} color={theme.color.gray[500]} />
          </TouchableOpacity>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 20,
    marginHorizontal: 0,
  },
  addButton: {
    marginRight: 10,
    padding: 5,
  },
  previewButton: {
    padding: 5,
  },
  floatingButtonContainer: {
    position: 'absolute',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    right: 20,
    borderRadius: 6,
    borderWidth: 1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
});

export default SurveyScreen;
