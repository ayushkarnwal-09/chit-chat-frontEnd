import { createContext, useContext, useMemo, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};
export const SocketProvider = (props) => {
  const [socket, setSocket] = useState(null);

  const value = useMemo(() => ({ socket, setSocket }), [socket]);
  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
