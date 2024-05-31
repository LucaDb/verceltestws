import { getLocaleFromProps } from '@websolutespa/bom-mixer-models';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet, css } from 'styled-components';

export default class MyDocument extends Document {

  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () => originalRenderPage({
        // !!! ssr only
        enhanceApp: (App) => (props) => sheet.collectStyles(
          <App {...props} />
        ),
      });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const lang = getLocaleFromProps(this.props);
    return (
      <Html lang={lang}>
        <Head>
          <style dangerouslySetInnerHTML={{
            __html: css`
            @font-face {
              font-family: 'yellixregular';
              src: url('/assets/fonts/Yellix-Medium.woff2') format('woff2'),
                  url('/assets/fonts/Yellix-Medium.woff') format('woff');
              font-weight: normal;
              font-style: normal;
              font-feature-settings: 'ss01';
            }

            body {
              font-feature-settings: 'ss01';
            }
          `}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
