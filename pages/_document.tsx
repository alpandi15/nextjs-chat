import React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'
import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <React.Fragment key="styles">
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render () {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}