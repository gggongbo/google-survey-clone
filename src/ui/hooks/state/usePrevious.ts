import {useRef, useEffect} from 'react';

/**
 * target state의 이전값 저장
 * @param target
 */
const usePrevious = <T>(target: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = target;
  }, [target]);

  return ref.current;
};

export default usePrevious;
