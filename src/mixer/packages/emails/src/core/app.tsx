import { LabelProvider, LayoutProvider } from '@websolutespa/bom-mixer-hooks';
import { LayoutDefault } from '../layouts/layout-default/layout-default';
import { IEmailAppComponent } from './types';

export const App: IEmailAppComponent = ({ Component, ...props }) => {
  const Layout = Component.Layout || LayoutDefault;
  return (
    <LayoutProvider layout={props.layout}>
      <LabelProvider>
        <Layout {...props}>
          <Component {...props}></Component>
        </Layout>
      </LabelProvider>
    </LayoutProvider>
  );
};
