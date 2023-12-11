import {useEffect, EffectCallback} from 'react';

/**
 * component의 mount 후 한번만 불리는 useEffect wrapper.
 * cleanup 함수를 통해 unmount 시 불리는 callback 호출 가능.
 * @param {EffectCallback} callback useEffect callback
 */
const useMount = (callback: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};

export default useMount;
