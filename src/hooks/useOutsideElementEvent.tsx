import { useRef, useEffect, ReactElement, useCallback } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: any, functionToCall: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        functionToCall();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, functionToCall]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter({ children, onClick }: { children: ReactElement, onClick: () => void}) {
  const wrapperRef = useRef(null);
  const functionToCall = useCallback(() => onClick(), [onClick]);
  useOutsideAlerter(wrapperRef, functionToCall);

  return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideAlerter;
