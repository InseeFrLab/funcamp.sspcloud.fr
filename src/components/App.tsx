import React from "react";
import { useRoute } from "../router";
import { CountDownAndHomeCastle } from "./CountDownAndHomeCastle/CountDownAndHomeCastle";
import { Home } from "./Home/Home";

export const App: React.FC = () => {

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

