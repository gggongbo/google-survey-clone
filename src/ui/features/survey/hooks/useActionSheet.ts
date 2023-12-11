import {MutableRefObject} from 'react';

import {ActionSheetRef} from '@ui/features/survey/components/organism';

let actionSheetRef: MutableRefObject<ActionSheetRef | null> | null = null;

const useActionSheet = () => {
  const initialize = (ref: MutableRefObject<ActionSheetRef | null> | null) => {
    actionSheetRef = ref;
  };

  return {actionSheetRef, initialize};
};

export default useActionSheet;
