import {useLayoutEffect, useRef} from 'react';

const useLayoutUpdateEffect: typeof useLayoutEffect = (effect, deps) => {
  const isFirst = useRef<boolean>(true);

  // eslint-disable-next-line consistent-return
  useLayoutEffect(() => {
    if (!isFirst.current) return effect();
    isFirst.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useLayoutUpdateEffect;
