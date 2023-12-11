import React, {useCallback} from 'react';
import {
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from '@lib/expo/vector-icons';
import {StackScreenProps} from '@lib/react-navigation/stack';
import {useSelector} from '@lib/react-redux';
import {useTheme} from '@lib/styled-components';
import {FloatingButton} from '@ui/features/preview/components/atom';
import {PreviewList} from '@ui/features/preview/components/organism';
import {AppNavigatorParamList, routes} from '@ui/navigations/AppNavigator/type';
import {PreviewSliceState, previewActions} from '@ui/slices/preview';
import {SurveySliceState} from '@ui/slices/survey';
import {ReduxStore, useReduxDispatch} from '@ui/store';

type PreviewScreenProps = StackScreenProps<
  AppNavigatorParamList,
  routes.PREVIEW
>;

const PreviewScreen = (props: PreviewScreenProps) => {
  const {navigation} = props;
  const theme = useTheme();
  const dispatch = useReduxDispatch();

  const survey = useSelector<ReduxStore, SurveySliceState>(
    ({survey: reduxSurvey}) => reduxSurvey,
  );
  const preview = useSelector<ReduxStore, PreviewSliceState>(
    ({preview: reduxPreview}) => reduxPreview,
  );

  const navigateToGoBack = () => {
    navigation.goBack();
  };

  const onTitleLayout = useCallback(
    ({nativeEvent}: LayoutChangeEvent) => {
      const {height} = nativeEvent.layout;
      dispatch(previewActions.setTitleHeight(Math.ceil(height)));
    },
    [dispatch],
  );

  return (
    <View
      style={[{backgroundColor: theme.color.purple[100]}, styles.container]}>
      <View
        style={[
          {backgroundColor: theme.color.purple[300]},
          styles.titleContainer,
        ]}
        onLayout={onTitleLayout}>
        <View
          style={[{backgroundColor: theme.color.appBackground}, styles.title]}>
          <Text style={styles.titleText}>{survey?.title}</Text>
          {!!survey?.description && survey?.description?.length > 0 && (
            <Text style={styles.descriptionText}>{survey?.description}</Text>
          )}
        </View>
      </View>
      <View style={styles.listContainer}>
        <PreviewList
          data={survey?.surveyList}
          previewList={preview?.previewList}
          titleHeight={preview?.titleHeight}
        />
      </View>
      <FloatingButton
        // eslint-disable-next-line react-native/no-inline-styles
        customStyle={{bottom: Platform.OS === 'ios' ? 100 : 10}}
        onPress={navigateToGoBack}>
        <Icon name="arrow-left" size={24} color={theme.color.gray[500]} />
      </FloatingButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    borderRadius: 6,
  },
  title: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    marginTop: 10,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  titleText: {
    fontSize: 30,
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 10,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 20,
    marginHorizontal: 0,
  },
});

export default PreviewScreen;
