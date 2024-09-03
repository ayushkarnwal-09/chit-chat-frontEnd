import React, { createContext, useState } from "react";

export const LoginContext = createContext(null);
export const LoginContextProvider = (props) => {
  const [name, setName] = useState("");

  return (
    <LoginContext.Provider value={{ name, setName }}>
      {props.children}
    </LoginContext.Provider>
  );
};
