import { ChakraProvider } from "@chakra-ui/react";
import { AuthPage } from "./components/AuthPage/AuthPage";
import { Chats } from "./components/Chats/Chats";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { check_jwt } from "./helpers/helpers";

function App() {
  const [windowWidth, setWidth] = useState(0);

  useEffect(() => {
    const widthHandle = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", widthHandle);

    widthHandle();
    return () => {
      window.removeEventListener("resize", widthHandle);
    };
  }, []);

  useEffect(() => {
    check_jwt();
  }, []);

  const user = useSelector((state: any) => state.authReducer.authData);

  return (
    <ChakraProvider>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="chats" /> : <Navigate to="auth" />}
        />
        <Route
          path="/chats"
          element={
            user ? (
              <Chats windowWidth={windowWidth} />
            ) : (
              <Navigate to="../auth" />
            )
          }
        />
        <Route
          path="/auth"
          element={
            user ? (
              <Navigate to="../chats" />
            ) : (
              <AuthPage windowWidth={windowWidth} />
            )
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
