import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const uri =
  process.env.VERCEL_ENV || process.env.NODE_ENV === "production"
    ? "/api/graphql"
    : "http://localhost:4000/";

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
