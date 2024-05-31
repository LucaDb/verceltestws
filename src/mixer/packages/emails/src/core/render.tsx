
import { render } from '@react-email/render';
import { isProduction } from '@websolutespa/bom-core';
import { App } from './app';
import { IEmailAppProps } from './types';

export function renderEmail<T>(props: IEmailAppProps<T>) {
  // console.log('renderEmail.props', props);
  const renderOptions = { pretty: !isProduction };
  // console.log('renderEmail.renderOptions', renderOptions);
  try {
    const html = render((<App {...props} />), renderOptions);
    // console.log('renderEmail', 'html', html);
    return html;
  } catch (error) {
    console.log(error);
    return 'An error occurred';
  }
}
