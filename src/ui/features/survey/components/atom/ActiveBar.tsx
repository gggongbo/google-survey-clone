import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useTheme} from '@lib/styled-components';

type ActiveBarProps = {
  isActive?: boolean;
};

const ActiveBar = (props: ActiveBarProps) => {
  const {isActive} = props;
  const theme = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: isActive
            ? theme.color.blue[300]
            : theme.color.appBackground,
        },
        styles.activeBar,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  activeBar: {
    marginTop: 10,
    width: 10,
    borderBottomLeftRadius: 6,
  },
});

export default ActiveBar;
