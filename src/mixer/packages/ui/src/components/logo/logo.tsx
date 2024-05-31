import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Logo = React.forwardRef<SVGSVGElement, any>((props, ref) => {
  return (
    <svg className="icon--logo" viewBox="0 0 105 17.22" {...props} ref={ref}><path d="m4.3,16.98L0,5.14h2.38l2.84,8.49,3.03-8.49h1.82l3.08,8.49,2.81-8.49h2.4l-4.32,11.84h-1.8l-3.08-8.49-3.11,8.49h-1.77Zm25.86-6.21c0,.34-.02.64-.05.9h-9.51c.13,1.08.54,1.95,1.24,2.6.71.63,1.61.95,2.69.95.83,0,1.54-.19,2.14-.56.61-.37.99-.87,1.14-1.5h2.23c-.21,1.23-.83,2.22-1.87,2.96-1.04.74-2.27,1.12-3.71,1.12-1.71,0-3.15-.59-4.32-1.77-1.16-1.2-1.75-2.68-1.75-4.44s.58-3.16,1.75-4.34c1.16-1.18,2.6-1.77,4.3-1.77,1.6,0,2.95.56,4.05,1.67,1.12,1.1,1.67,2.5,1.67,4.2Zm-9.49-.99h7.06c-.1-.84-.46-1.52-1.09-2.04-.61-.53-1.38-.8-2.31-.8s-1.71.25-2.38.75c-.65.5-1.08,1.2-1.29,2.09Zm17.34-4.87c1.63,0,3,.6,4.1,1.79,1.12,1.18,1.67,2.64,1.67,4.37s-.56,3.19-1.67,4.39c-1.1,1.18-2.47,1.77-4.1,1.77-.83,0-1.61-.19-2.35-.56-.74-.37-1.28-.84-1.6-1.41v1.72h-2.26V0h2.26v6.86c.32-.57.86-1.03,1.6-1.41.74-.37,1.53-.56,2.35-.56Zm-.44,10.21c1.15,0,2.1-.39,2.86-1.16.78-.78,1.16-1.74,1.16-2.89s-.39-2.13-1.16-2.89c-.76-.78-1.71-1.16-2.86-1.16-.73,0-1.42.19-2.06.56-.65.37-1.13.85-1.46,1.43v4.15c.32.58.81,1.06,1.46,1.43.65.36,1.33.53,2.06.53Zm11.89,2.11c-1.39,0-2.54-.35-3.45-1.04-.91-.7-1.42-1.64-1.53-2.84h2.14c.08.58.37,1.05.87,1.41.5.36,1.12.53,1.87.53s1.31-.15,1.75-.46c.45-.31.68-.71.68-1.21,0-.53-.24-.94-.73-1.21-.49-.29-1.08-.49-1.77-.61-.68-.13-1.37-.27-2.06-.44-.68-.18-1.26-.51-1.75-.99-.49-.49-.73-1.14-.73-1.96,0-1.02.4-1.85,1.19-2.5.79-.66,1.84-.99,3.15-.99,1.21,0,2.26.32,3.13.97.89.63,1.41,1.5,1.55,2.6h-2.26c-.08-.49-.35-.88-.8-1.19-.45-.32-1.01-.49-1.67-.49s-1.14.13-1.53.39c-.39.26-.58.61-.58,1.04s.17.78.51,1.04c.36.24.79.41,1.31.51.52.08,1.08.19,1.7.34.61.15,1.18.32,1.7.51.52.19.95.54,1.29,1.04.36.5.53,1.13.53,1.89,0,1.05-.43,1.92-1.29,2.62-.86.7-1.93,1.04-3.23,1.04Zm11.55,0c-1.73,0-3.19-.59-4.37-1.77-1.16-1.18-1.75-2.64-1.75-4.37s.58-3.21,1.75-4.39c1.18-1.2,2.64-1.79,4.37-1.79s3.16.6,4.34,1.79c1.18,1.18,1.77,2.64,1.77,4.39s-.59,3.19-1.77,4.37c-1.18,1.18-2.63,1.77-4.34,1.77Zm0-2.13c1.1,0,2.03-.38,2.79-1.14.76-.78,1.14-1.73,1.14-2.86s-.38-2.11-1.14-2.89c-.76-.78-1.69-1.16-2.79-1.16s-2.05.39-2.81,1.16c-.74.78-1.12,1.74-1.12,2.89s.37,2.09,1.12,2.86c.76.76,1.7,1.14,2.81,1.14ZM71.03,0v16.98h-2.26V0h2.26Zm11.01,5.14h2.23v11.84h-2.23v-1.72c-.37.6-.91,1.08-1.63,1.43-.7.36-1.45.53-2.26.53-1.47,0-2.65-.48-3.54-1.43-.87-.97-1.31-2.26-1.31-3.86v-6.79h2.26v6.45c0,1.03.28,1.87.85,2.5.57.61,1.32.92,2.26.92.7,0,1.35-.17,1.97-.51.61-.34,1.08-.8,1.41-1.38v-7.98Zm11.04,2.13h-3.2v5.46c0,1.52.79,2.28,2.38,2.28.34,0,.61-.03.83-.1v2.06c-.36.1-.78.15-1.29.15-1.28,0-2.29-.37-3.03-1.12-.74-.74-1.12-1.82-1.12-3.23v-5.51h-2.31v-2.13h2.31V1.94h2.23v3.2h3.2v2.13Zm11.91,3.49c0,.34-.02.64-.05.9h-9.51c.13,1.08.54,1.95,1.24,2.6.71.63,1.61.95,2.69.95.83,0,1.54-.19,2.14-.56.61-.37.99-.87,1.14-1.5h2.23c-.21,1.23-.83,2.22-1.87,2.96-1.04.74-2.27,1.12-3.71,1.12-1.71,0-3.15-.59-4.32-1.77-1.16-1.2-1.75-2.68-1.75-4.44s.58-3.16,1.75-4.34c1.16-1.18,2.6-1.77,4.3-1.77,1.6,0,2.95.56,4.05,1.67,1.12,1.1,1.67,2.5,1.67,4.2Zm-9.49-.99h7.06c-.1-.84-.46-1.52-1.09-2.04-.61-.53-1.38-.8-2.31-.8s-1.71.25-2.38.75c-.65.5-1.08,1.2-1.29,2.09Z" fill="currentColor" /></svg>
  );
});

Logo.displayName = 'Logo';
