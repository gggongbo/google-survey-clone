import React, {useCallback} from 'react';
import {LayoutChangeEvent, Pressable, StyleSheet, View} from 'react-native';

import {useTheme} from '@lib/styled-components';
import {TextInput} from '@ui/components/molecule';
import {ActiveBar} from '@ui/features/survey/components/atom';
import {componentActions} from '@ui/slices/component';
import {surveyActions} from '@ui/slices/survey';
import {useReduxDispatch} from '@ui/store';

type SurveyTitleProps = {
  title?: string;
  description?: string;
  isActive?: boolean;
  isTitleFocus?: boolean;
  isDescriptionFocus?: boolean;
};

const SurveyTitle = (props: SurveyTitleProps) => {
  const {
    title,
    description,
    isActive = false,
    isTitleFocus = false,
    isDescriptionFocus = false,
  } = props;
  const theme = useTheme();
  const dispatch = useReduxDispatch();

  const onTitleFocus = useCallback(() => {
    dispatch(surveyActions.setIsTitleFocus(true));
    dispatch(surveyActions.setIsListFocus(false));
    dispatch(componentActions.setInputFocusType('title'));
  }, [dispatch]);

  const onTitleLayout = useCallback(
    ({nativeEvent}: LayoutChangeEvent) => {
      const {height} = nativeEvent.layout;
      dispatch(surveyActions.setTitleHeight(Math.ceil(height)));
    },
    [dispatch],
  );

  const onTitleChange = useCallback(
    (text: string) => {
      dispatch(surveyActions.setTitle(text || '제목 없는 설문지'));
    },
    [dispatch],
  );

  const onDescriptionFocus = useCallback(() => {
    dispatch(surveyActions.setIsTitleFocus(true));
    dispatch(surveyActions.setIsListFocus(false));
    dispatch(componentActions.setInputFocusType('description'));
  }, [dispatch]);

  const onDescriptionChange = useCallback(
    (text: string) => {
      dispatch(surveyActions.setDescription(text || ''));
    },
    [dispatch],
  );

  return (
    <Pressable
      style={[{backgroundColor: theme.color.purple[300]}, styles.container]}
      onPress={onTitleFocus}
      onLayout={onTitleLayout}>
      <ActiveBar isActive={isActive} />
      <View
        style={[{backgroundColor: theme.color.appBackground}, styles.title]}>
        <TextInput
          value={title}
          fontSize={30}
          isFocus={isTitleFocus}
          isActive={isActive}
          onFocus={onTitleFocus}
          onChangeText={onTitleChange}
        />
        <TextInput
          value={description}
          placeholder="설문지 설명"
          fontSize={16}
          isFocus={isDescriptionFocus}
          isActive={isActive}
          onFocus={onDescriptionFocus}
          onChangeText={onDescriptionChange}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 6,
  },
  title: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    marginTop: 10,
    borderBottomRightRadius: 6,
  },
});

export default SurveyTitle;
