import {ComponentProps} from 'react';

import Icon from '@lib/expo/vector-icons';
import {createSlice, PayloadAction} from '@lib/reduxjs/toolkit';

export type SurveyType = 'input' | 'area' | 'radio' | 'checkbox';

export type SurveyTypeItem = {
  value: SurveyType;
  name: string;
  icon: ComponentProps<typeof Icon>['name'];
};

export type CurrentAnswer = {
  surveyIndex: number;
  answerIndex: number;
  answer: string;
};

export type Survey = {
  type: 'input' | 'area' | 'radio' | 'checkbox';
  question: string;
  answerList?: string[];
  required?: boolean;
  hasEtc?: boolean;
};

export type SurveySliceState = {
  isPreview: boolean;
  isTitleFocus: boolean;
  isListFocus: boolean;
  titleHeight?: number;
  title?: string;
  description?: string;
  typeList?: SurveyTypeItem[];
  surveyList: Survey[];
  focusSurvey?: number;
  currentAnswer?: CurrentAnswer;
};

const initialState: SurveySliceState = {
  isPreview: false,
  isTitleFocus: false,
  isListFocus: false,
  title: '제목 없는 설문지',
  titleHeight: 0,
  description: undefined,
  typeList: [
    {name: '단답형', value: 'input', icon: 'text-short'},
    {name: '장문형', value: 'area', icon: 'text-long'},
    {name: '객관식질문', value: 'radio', icon: 'radiobox-marked'},
    {name: '체크박스', value: 'checkbox', icon: 'checkbox-outline'},
  ],
  surveyList: [{type: 'input', question: '제목없는 질문'}],
  focusSurvey: undefined,
  currentAnswer: undefined,
};

/* eslint-disable no-param-reassign */
const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setIsTitleFocus: (state, action: PayloadAction<boolean>) => {
      state.isTitleFocus = action.payload;
    },
    setIsListFocus: (state, action: PayloadAction<boolean>) => {
      state.isListFocus = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setTitleHeight: (state, action: PayloadAction<number>) => {
      state.titleHeight = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setSurveyList: (state, action: PayloadAction<Survey[]>) => {
      state.surveyList = action.payload;
    },
    setCurrentAnswer: (state, action: PayloadAction<CurrentAnswer>) => {
      state.currentAnswer = action.payload;
    },
    setFocusSurvey: (state, action: PayloadAction<number>) => {
      state.focusSurvey = action.payload;
    },
    addSurveyList: (state, action: PayloadAction<Survey>) => {
      if (!action.payload) return;
      const newSurveyList = [...state.surveyList];
      newSurveyList.push(action.payload);
      state.surveyList = newSurveyList;
    },
    updateSurveyList: (
      state,
      action: PayloadAction<{index: number; item: Survey}>,
    ) => {
      const {index, item} = action.payload;
      if (!item) return;
      const newSurveyList = [...state.surveyList];
      newSurveyList[index] = item;
      state.surveyList = newSurveyList;
    },
    deleteSurveyList: (state, action: PayloadAction<number>) => {
      const newSurveyList = [...state.surveyList];
      newSurveyList.splice(action.payload, 1);
      state.surveyList = newSurveyList;
    },
    addSurveyAnswerList: (
      state,
      action: PayloadAction<{
        surveyIndex: number;
        answerIndex: number;
        item: string;
      }>,
    ) => {
      const {surveyIndex, item} = action.payload;
      if (!item) return;
      const {answerList} = state.surveyList[surveyIndex];
      const newAnswerList =
        !answerList || answerList?.length < 1 ? [] : [...answerList];
      newAnswerList.push(item);

      state.surveyList[surveyIndex].answerList = newAnswerList;
    },
    updateSurveyAnswerList: (
      state,
      action: PayloadAction<{
        surveyIndex: number;
        answerIndex: number;
        item: string;
      }>,
    ) => {
      const {surveyIndex, answerIndex, item} = action.payload;
      if (!item) return;
      const {answerList} = state.surveyList[surveyIndex];
      if (!answerList || answerList?.length < 1) return;

      const newAnswerList = [...answerList];
      newAnswerList[answerIndex] = item;
      state.surveyList[surveyIndex].answerList = newAnswerList;
    },
    deleteSurveyAnswerList: (
      state,
      action: PayloadAction<{
        surveyIndex: number;
        answerIndex: number;
      }>,
    ) => {
      const {surveyIndex, answerIndex} = action.payload;
      const {answerList} = state.surveyList[surveyIndex];
      if (!answerList || answerList?.length < 1) return;

      const newAnswerList = [...answerList];
      newAnswerList.splice(answerIndex, 1);
      state.surveyList[surveyIndex].answerList = newAnswerList;
    },
  },
});

export const surveyActions = surveySlice.actions;

export default surveySlice.reducer;
