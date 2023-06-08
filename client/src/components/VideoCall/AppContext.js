import React from "react";
import { ContextProvider } from "./Context";

import "./styles.css";
import AppVideo from "./App";

export const AppContext = () => {
  return (
    <ContextProvider>
      <AppVideo />
    </ContextProvider>
  );
};
