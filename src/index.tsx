import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { theme } from "./config/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { persistCache } from "apollo-cache-persist";
import { PersistentStorage, PersistedData } from "apollo-cache-persist/types";

const Index: React.FC = () => {
  const [client, setClient] = useState<ApolloClient<
    NormalizedCacheObject
  > | null>(null);

  useEffect(() => {
    // const authorization: string = localStorage.getItem("id");
    const uri: string =
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000/graphql"
        : "https://phoenix.rctech.club/graphql";

    const link = new HttpLink({
      uri,
      // headers: {
      //   authorization,
      // },
    });

    const cache = new InMemoryCache();

    const client = new ApolloClient({
      cache,
      link,
    });

    persistCache({
      cache,
      storage: window.sessionStorage as PersistentStorage<
        PersistedData<NormalizedCacheObject>
      >,
    }).then(() => setClient(client));
  });

  if (!client) return <></>;

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
