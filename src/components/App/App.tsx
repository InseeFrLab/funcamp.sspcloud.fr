import React, { useRef, useCallback } from "react";
import "./App.scss";

export const App: React.FC = () => {

  const appRef = useRef<HTMLDivElement>(null);

  const clickCallback = useCallback(() =>
    appRef.current!.classList.add("fullScreen"),
    []
  );

  return (
    <div className="App" ref={appRef}>

      <div className="castleSide">

      </div>

      <div className="catchphraseSide">

        <h1>Le Funcamp R, de la nostalgie, du fun et du R!</h1>
        <h2>...saurez-vous percer les mystères du royaume de Statis?</h2>
        <button onClick={clickCallback}> Let's go </button>


      </div>

    </div>
  );
}

