import React, {useMemo} from 'react';

import AppNavigator from './AppNavigator';
import {routes} from './type';

import {useSelector} from '@lib/react-redux';
import {ReduxStore} from '@ui/store';

const AppNavigatorContainer = () => {
  const isPreview = useSelector<ReduxStore, boolean>(
    ({survey}) => survey?.isPreview,
  );

  const screen = useMemo(() => {
    if (!isPreview) return routes.SURVEY;
    return routes.PREVIEW;
  }, [isPreview]);

  return <AppNavigator screen={screen} />;
};

export default AppNavigatorContainer;
