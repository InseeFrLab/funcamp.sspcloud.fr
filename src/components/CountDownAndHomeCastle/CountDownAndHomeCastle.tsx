
import React from "react";
import styles from "./CountDownAndHomeCastle.scss";
import { routes } from "../../router";
import { useAsyncAbortable } from "react-async-hook";
import type { Route } from "type-route";
import { createGroup } from "type-route";

export const routeGroup = createGroup([
    routes.home,
    routes.countdown
]);

export const CountDownAndHomeCastle: React.FC<{
    route: Route<typeof routeGroup>;
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
        ${(route.name === "home" || isTransitioningToHome) ? "homepageState" : ""}
      `}
        >
            <div className="castle">
                {route.name === "countdown" && (
                    <div className="countdown">
                        <div>
                            <p>Coutdown placeholder</p>
                        </div>
                    </div>
                )}
                {route.name === "home" && <p>Home placeholder !</p>}
            </div>

            {route.name === "countdown" &&
                <div className="countdownSidePanel">

                    <div>

                        <h1>Le Funcamp R, de la nostalgie, du fun et du R!</h1>
                        <h2>...saurez-vous percer les mystères du royaume de Statis?</h2>
                        <button onClick={buttonCallback}>Découvrir</button>

                    </div>


                </div>
            }

        </div>
    );

};


