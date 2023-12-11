import {
  KeyboardEvent,
  EmitterSubscription,
  Keyboard,
  KeyboardEventName,
  Platform,
} from 'react-native';

import {useMount} from '../lifecycle';

const keyboardEventName = Platform.select<KeyboardEventName[]>({
  ios: ['keyboardWillChangeFrame'],
  android: ['keyboardDidShow', 'keyboardDidHide'],
});

type keyboardEventHandler = (event: KeyboardEvent) => void;

const useKeyboardEvent = (eventHandler: keyboardEventHandler) => {
  useMount(() => {
    const subscriptions: EmitterSubscription[] = [];
    if (keyboardEventName) {
      keyboardEventName.forEach(eventName => {
        subscriptions.push(Keyboard.addListener(eventName, eventHandler));
      });
    }
    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  });
};

export default useKeyboardEvent;
