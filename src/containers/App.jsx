import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { Helmet } from "react-helmet";
import { css } from "react-emotion";

const bigText = css`
  font-size: 20px;
  font-family: sans-serif;
  margin-left: 5px;
`;

const App = () => (
  <Fragment>
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        id="viewport"
        content="width=device-width,
        minimum-scale=1, initial-scale=1"
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="description" content="A React app." />

      <title>Simply React</title>
    </Helmet>

    <main>
      <p className={bigText}>Blank Project.</p>
    </main>
  </Fragment>
);

export default hot(module)(App);
