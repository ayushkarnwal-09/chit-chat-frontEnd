import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { SocketProvider } from "./contexts/SocketProvider";

function App() {
  return (
    <div className="main_div">
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </SocketProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
