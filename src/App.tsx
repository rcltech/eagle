import React from "react";
import { Header } from "./components/Header";
import { Container } from "@material-ui/core";
import { Login } from "./components/Login";

const App: React.FC = () => {
  return (
    <>
      <Header/>
      <Container fixed>
        <Login />
      </Container>
    </>
  );
};

export default App;
