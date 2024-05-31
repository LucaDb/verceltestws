import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IconGallery = React.forwardRef<SVGSVGElement, any>((props, ref) => {
  return (<svg width="1em" height="1em" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-gallery" data-icon="" {...props} ref={ref}><path fillRule="evenodd" clipRule="evenodd" d="M0.75 0.5H2V15.5H0.75V0.5ZM8.25 1.75V14.25H5.75V1.75H8.25ZM8.25 0.5H5.75C5.41848 0.5 5.10054 0.631696 4.86612 0.866116C4.6317 1.10054 4.5 1.41848 4.5 1.75V14.25C4.5 14.5815 4.6317 14.8995 4.86612 15.1339C5.10054 15.3683 5.41848 15.5 5.75 15.5H8.25C8.58152 15.5 8.89946 15.3683 9.13388 15.1339C9.3683 14.8995 9.5 14.5815 9.5 14.25V1.75C9.5 1.41848 9.3683 1.10054 9.13388 0.866116C8.89946 0.631696 8.58152 0.5 8.25 0.5ZM13.25 0.5H12V15.5H13.25V0.5Z" fill="currentColor"/></svg>);
});

IconGallery.displayName = 'IconGallery';
