import React, {useCallback} from 'react';
import {Platform} from 'react-native';

import SurveyListItem from './SurveyListItem';

import {FlatList} from '@lib/react-native-gesture-handler';
import {KeyboardAvoidingView} from '@ui/components/atom';
import {SurveyTypeList} from '@ui/features/survey/components/molecule';
import {useActionSheet} from '@ui/features/survey/hooks';
import {useAppDimensions} from '@ui/hooks/device';
import {componentActions} from '@ui/slices/component';
import {CurrentAnswer, Survey, SurveyTypeItem} from '@ui/slices/survey';
import {useReduxDispatch} from '@ui/store';

type SurveyListProps = {
  data: Survey[];
  typeList?: SurveyTypeItem[];
  isListFocus?: boolean;
  inputFocusType?: string;
  focusSurvey?: number;
  titleHeight?: number;
  currentAnswer?: CurrentAnswer;
};

const SurveyList = (props: SurveyListProps) => {
  const {
    data,
    typeList,
    isListFocus,
    inputFocusType,
    focusSurvey,
    titleHeight = 160,
    currentAnswer,
  } = props;
  const {height: appHeight, IOSStatusBarHeight} = useAppDimensions();
  const {actionSheetRef} = useActionSheet();
  const dispatch = useReduxDispatch();

  const actionSheetCreate = useCallback(
    (params: {item: Survey; index: number}) => {
      const {item, index} = params;
      dispatch(
        componentActions.setActionSheetProps({
          isScrollableItem: true,
          itemHeightPercent: 0.5,
          // eslint-disable-next-line react/no-unstable-nested-components
          item: () => (
            <SurveyTypeList
              data={typeList}
              surveyItem={item}
              surveyIndex={index}
              actionSheetRef={actionSheetRef}
            />
          ),
        }),
      );
      if (actionSheetRef?.current) actionSheetRef?.current.setVisible(true);
    },
    [actionSheetRef, dispatch, typeList],
  );

  const renderItem = useCallback(
    (renderItemProps: {item: Survey; index: number}) => {
      const {item, index} = renderItemProps;
      if (!item) return null;
      const typeInfo = typeList?.find(
        typeItem => typeItem?.value === item.type,
      );

      return (
        <SurveyListItem
          key={`${index}${item}`}
          surveyItem={item}
          surveyIndex={index}
          typeInfo={typeInfo}
          isListFocus={isListFocus}
          inputFocusType={inputFocusType}
          focusSurvey={focusSurvey}
          currentAnswer={currentAnswer}
          actionSheetCreate={actionSheetCreate}
        />
      );
    },
    [
      typeList,
      isListFocus,
      inputFocusType,
      focusSurvey,
      currentAnswer,
      actionSheetCreate,
    ],
  );

  return (
    <KeyboardAvoidingView avoidingHeight={titleHeight + 50}>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        style={
          Platform.OS === 'ios' && {
            height: appHeight - IOSStatusBarHeight - titleHeight - 100,
          }
        }
      />
    </KeyboardAvoidingView>
  );
};

export default SurveyList;
