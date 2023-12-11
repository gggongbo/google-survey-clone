import {createSlice, PayloadAction} from '@lib/reduxjs/toolkit';
import {ActionSheetProps} from '@ui/features/survey/components/organism';

export type ComponentSliceState = {
  inputFocusType?: string;
  actionSheetVisible: boolean;
  actionSheetProps: ActionSheetProps;
};

const initialState: ComponentSliceState = {
  inputFocusType: undefined,
  actionSheetVisible: false,
  actionSheetProps: {
    title: undefined,
    item: () => null,
    itemHeight: undefined,
    itemHeightPercent: undefined,
    isScrollableItem: false,
    onClose: () => {},
  },
};

/* eslint-disable no-param-reassign */
const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    setInputFocusType: (state, action: PayloadAction<string>) => {
      state.inputFocusType = action.payload;
    },
    setActionSheetVisible: (state, action: PayloadAction<boolean>) => {
      state.actionSheetVisible = action.payload;
    },
    setActionSheetProps: (state, action: PayloadAction<ActionSheetProps>) => {
      state.actionSheetProps = action.payload;
    },
  },
});

export const componentActions = componentSlice.actions;

export default componentSlice.reducer;
