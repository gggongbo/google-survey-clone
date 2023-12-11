import React from 'react';

import {AppNavigatorParamList, routes} from './type';

import {useNavigation} from '@lib/react-navigation/native';
import {createNativeStackNavigator} from '@lib/react-navigation/stack';
import {PreviewScreen} from '@ui/features/preview';
import {SurveyScreen} from '@ui/features/survey';
import {useLayoutUpdateEffect} from '@ui/hooks/lifecycle';
import {stackScreenOptions} from '@ui/navigations/screenOptions';

type AppNavigatorProps = {
  screen?: routes | null;
};

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

const AppNavigator = (props: AppNavigatorProps) => {
  const {screen} = props;
  const navigation = useNavigation();

  useLayoutUpdateEffect(() => {
    if (screen) navigation.reset({routes: [{name: screen as never}]});
  }, [screen]);

  return (
    <Stack.Navigator
      initialRouteName={routes.SURVEY}
      screenOptions={stackScreenOptions.fade}>
      <Stack.Screen name={routes.SURVEY} component={SurveyScreen} />
      <Stack.Screen name={routes.PREVIEW} component={PreviewScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
