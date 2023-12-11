import {createSlice, PayloadAction} from '@lib/reduxjs/toolkit';

export type Preview = {
  answer?: string;
  answerList?: string[];
  hasEtc?: boolean;
};

export type PreviewSliceState = {
  previewList: Preview[];
  titleHeight?: number;
};

const initialState: PreviewSliceState = {
  previewList: [],
  titleHeight: 0,
};

/* eslint-disable no-param-reassign */
const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    setPreviewList: (state, action: PayloadAction<Preview[]>) => {
      state.previewList = action.payload;
    },
    setTitleHeight: (state, action: PayloadAction<number>) => {
      state.titleHeight = action.payload;
    },
    setPreviewHasEtc: (
      state,
      action: PayloadAction<{index: number; item: boolean}>,
    ) => {
      const {index, item} = action.payload;
      state.previewList[index] = {
        ...state.previewList[index],
        hasEtc: item,
      };
    },
    setPreviewRadioAnswerList: (
      state,
      action: PayloadAction<{
        previewIndex: number;
        item: string;
      }>,
    ) => {
      const {previewIndex, item} = action.payload;
      if (!item) return;
      if (state.previewList?.[previewIndex]?.answer === item) {
        state.previewList[previewIndex] = {
          ...state.previewList[previewIndex],
          answer: undefined,
        };
      } else {
        state.previewList[previewIndex] = {
          ...state.previewList[previewIndex],
          answer: item,
        };
      }
    },
    resetPreviewRadioAnswerList: (state, action: PayloadAction<number>) => {
      state.previewList[action.payload] = {
        ...state.previewList[action.payload],
        answer: undefined,
      };
    },
    setPreviewCheckboxAnswerList: (
      state,
      action: PayloadAction<{
        previewIndex: number;
        item: string;
      }>,
    ) => {
      const {previewIndex, item} = action.payload;
      if (!item) return;
      const newPreviewAnswerList =
        state.previewList?.[previewIndex]?.answerList ?? [];

      const findIndex =
        newPreviewAnswerList?.findIndex(answer => answer === item) ?? 0;

      if (findIndex > -1) {
        newPreviewAnswerList.splice(findIndex, 1);
        state.previewList[previewIndex] = {
          ...state.previewList[previewIndex],
          answerList: newPreviewAnswerList,
        };
      } else {
        newPreviewAnswerList.push(item);
        state.previewList[previewIndex] = {
          ...state.previewList[previewIndex],
          answerList: newPreviewAnswerList,
        };
      }
    },
  },
});

export const previewActions = previewSlice.actions;

export default previewSlice.reducer;
