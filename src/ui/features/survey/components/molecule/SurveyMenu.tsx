import {Switch} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from '@lib/expo/vector-icons';
import {useTheme} from '@lib/styled-components';

type SurveyMenuProps = {
  required?: boolean;
  onRequireChange: () => void;
  onCopyButtonPress: () => void;
  onDeleteButtonPress: () => void;
};

const SurveyMenu = (props: SurveyMenuProps) => {
  const {required, onRequireChange, onCopyButtonPress, onDeleteButtonPress} =
    props;
  const theme = useTheme();

  return (
    <View style={[{borderTopColor: theme.color.gray[100]}, styles.container]}>
      <Text style={styles.requiredText}>필수</Text>
      <Switch value={required} onValueChange={onRequireChange} />
      <TouchableOpacity style={styles.button} onPress={onCopyButtonPress}>
        <Icon name="content-copy" size={25} color={theme.color.gray[400]} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onDeleteButtonPress}>
        <Icon name="delete" size={25} color={theme.color.gray[400]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  requiredText: {
    marginRight: 10,
  },
  button: {
    marginLeft: 10,
  },
});

export default SurveyMenu;
