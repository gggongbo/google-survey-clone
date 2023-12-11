import React from 'react';

import {RootNavigatorParamList, routes} from './type';

import {createNativeStackNavigator} from '@lib/react-navigation/stack';
import AppNavigator from '@ui/navigations/AppNavigator';
import {stackScreenOptions} from '@ui/navigations/screenOptions';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const RootNavigator = () => (
  <Stack.Navigator screenOptions={stackScreenOptions.fade}>
    <Stack.Screen name={routes.APP} component={AppNavigator} />
  </Stack.Navigator>
);

export default React.memo(RootNavigator);
