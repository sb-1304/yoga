import React from "react";
import { Provider } from 'react-redux';

import { CustomRouter } from "./CustomRouter";
import { store } from './Redux/store';

const App = () => {

  return (
    <Provider store={store}>
      <CustomRouter />
    </Provider>
  );
};

export default App;