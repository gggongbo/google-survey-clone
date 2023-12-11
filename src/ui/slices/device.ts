import {createSlice, PayloadAction} from '@lib/reduxjs/toolkit';

export type DeviceSliceState = {
  isKeyboard?: boolean;
  keyboardHeight?: number;
};

const initialState: DeviceSliceState = {
  isKeyboard: false,
  keyboardHeight: 0,
};

/* eslint-disable no-param-reassign */
const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setIsKeyboard: (state, action: PayloadAction<boolean>) => {
      state.isKeyboard = action.payload;
    },
    setKeyboardHeight: (state, action: PayloadAction<number>) => {
      state.keyboardHeight = action.payload;
    },
  },
});

export const deviceActions = deviceSlice.actions;

export default deviceSlice.reducer;
