import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';

export type ClickOutGetContainer = () => HTMLElement | null;

export function useLayoutClickOut(ref: MutableRefObject<HTMLElement | null>, handler: (event: MouseEvent) => void) {

  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useLayoutEffect(() => {
    const callback = (event: MouseEvent) => {
      const el = ref.current;
      if (!event || !el || el.contains(event.target as Node)) {
        return;
      }
      handlerRef.current(event);
    };
    document.addEventListener('mouseup', callback);
    return () => document.removeEventListener('mouseup', callback);
  }, [ref]);

}
