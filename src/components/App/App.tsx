import React from "react";
import ReactDOM from "react-dom";
import { useRoute } from "../../router";
import { CountDownAndHomeCastle } from "../CountDownAndHomeCastle/CountDownAndHomeCastle";
import { Home } from "../Home/Home";
import * as serviceWorker from "./serviceWorker";
import { RouteProvider } from "../../router";

import "./App.scss";

const App: React.FC = () => {

  const route = useRoute();

  console.log(route.name);

  return (
    <>
      {(() => {
        switch (route.name) {
          case "countdown":
          case "home":
            return <CountDownAndHomeCastle route={route} />
          default: return null;
        }
      })()}
      {(() => {
        switch (route.name) {
          case "home": return <Home route={route}/>;
          default: return null;
        }
      })()}
    </>
  );

};


ReactDOM.render(
  <React.StrictMode>
    <RouteProvider>
      <App />
    </RouteProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


