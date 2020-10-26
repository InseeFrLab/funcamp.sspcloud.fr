
import React from "react";
import styles from "./CountDownAndHomeCastle.scss";
import { routes } from "../../router";
import { useAsyncAbortable } from "react-async-hook";
import type { Route } from "type-route";

export const CountDownAndHomeCastle: React.FC<{
    route: Route<typeof routes.home> | Route<typeof routes.countdown>;
}> = params => {

    const { route } = params;

    const {
        execute: buttonCallback,
        loading: isTransitioningToHome
    } = useAsyncAbortable(
        async abortSignal => {

            await new Promise(
                resolve => setTimeout(
                    resolve,
                    styles.transitionDuration
                )
            );

            if (abortSignal.aborted) {
                return;
            }

            routes.home().push();

        },
        [],
        {
            "executeOnMount": false,
            "executeOnUpdate": false
        }
    );

    return (
        <div
            className={`
        CountDownAndHomeCastle
        ${route.name === "home" || isTransitioningToHome ? "home" : ""}
      `}
        >

            <div className="castle">
                {(() => {

                    switch (route.name) {
                        case "countdown": return <p>Coutdown placeholder</p>;
                        case "home": return <p>Home placeholder</p>;
                    }

                })()}
            </div>

            {route.name === "countdown" &&
                <div className="countdownSidePanel">
                    <h1>Le Funcamp R, de la nostalgie, du fun et du R!</h1>
                    <h2>...saurez-vous percer les mystères du royaume de Statis?</h2>
                    <button onClick={buttonCallback}>Découvrir</button>
                </div>
            }

        </div>
    );

};


