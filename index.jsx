import {registerRootComponent} from 'expo';
import React from 'react';

import App from '@ui/App';

function Wrapper(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <App {...props} />;
}

registerRootComponent(Wrapper);
