import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LogoDot = React.forwardRef<SVGSVGElement, any>((props, ref) => {
  return (
    <svg className="icon--logo-dot" {...props} ref={ref} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="currentColor" />
    </svg>
  );
});

LogoDot.displayName = 'LogoDot';
