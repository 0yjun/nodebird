import React from 'react';
import Proptypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>nodebird</title>
      </Head>
      <Component />
    </>
  );
};

App.prototypes = {
  Component: Proptypes.elementType.isRequired,
};
export default wrapper.withRedux(App);
