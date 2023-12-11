import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useTheme} from '@lib/styled-components';

const SurveyAnswerAddButton = (props: any) => {
  const {isRadio, isEtcVisible, onAddButtonPress, onEtcAddButtonPress} = props;
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          {borderColor: theme.color.gray[100]},
          isRadio ? styles.oval : styles.square,
        ]}
      />
      <TouchableOpacity onPress={onAddButtonPress}>
        <Text style={{color: theme.color.text[400]}}>옵션 추가</Text>
      </TouchableOpacity>
      {isEtcVisible && (
        <>
          <Text> 또는 </Text>
          <TouchableOpacity onPress={onEtcAddButtonPress}>
            <Text style={{color: theme.color.blue[300]}}>
              &apos;기타&apos; 추가
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  oval: {
    padding: 7,
    borderRadius: 100,
    marginRight: 15,
    borderWidth: 2,
  },
  square: {
    padding: 7,
    borderRadius: 3,
    marginRight: 15,
    borderWidth: 2,
  },
});

export default SurveyAnswerAddButton;
