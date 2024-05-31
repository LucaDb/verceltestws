import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IconClose = React.forwardRef<SVGSVGElement, any>((props, ref) => {
  return (<svg width="1em" height="1em" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-close" data-icon="" {...props} ref={ref}><path d="M13.5 1.6375L12.3625 0.5L7 5.8625L1.6375 0.5L0.5 1.6375L5.8625 7L0.5 12.3625L1.6375 13.5L7 8.1375L12.3625 13.5L13.5 12.3625L8.1375 7L13.5 1.6375Z" fill="currentColor"/></svg>);
});

IconClose.displayName = 'IconClose';
