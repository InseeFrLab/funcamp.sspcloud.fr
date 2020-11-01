
import React from "react";
import styles from "./CountDownAndHomeCastle.scss";
import { routes } from "../../router";
import { useAsyncAbortable } from "react-async-hook";
import type { Route } from "type-route";
import { createGroup } from "type-route";
import { Evt } from "evt";
import { useEvt } from "evt/hooks";

export const routeGroup = createGroup([
    routes.home,
    routes.countdown
]);

const upcomingEvents: {
    eventName: string;
    endtimeYear: number;
    endtimeMonth: number;
    endtimeDate: number;
    endtimeHours: number;
}[] = [
        {
            "eventName": "Orléans",
            "endtimeYear": 2020,
            "endtimeMonth": 11,
            "endtimeDate": 24,
            "endtimeHours": 9
        },
        {
            "eventName": "Nantes",
            "endtimeYear": 2020,
            "endtimeMonth": 12,
            "endtimeDate": 15,
            "endtimeHours": 9
        }
    ];

export const CountDownAndHomeCastle: React.FC<{
    route: Route<typeof routeGroup>;
}> = params => {

    const { route } = params;

    useEvt(ctx => {

        /*
        Evt.from(
            ctx,
            (window as any).$(document),
            "ready"
        ).attachOnce(() =>
        */
       Evt.from(
           ctx,
           document,
           "readystatechange"
       ).attachOnce(()=>
            upcomingEvents.forEach(({
                eventName,
                endtimeYear,
                endtimeDate,
                endtimeMonth,
                endtimeHours
            }) => (window as any).$(`.${eventName}`).countdown100({
                endtimeYear,
                endtimeMonth,
                endtimeDate,
                endtimeHours,
                "endtimeMinutes": 0,
                "endtimeSeconds": 0,
                "timeZone": "Europe/Paris"
            }))
        );


    }, []);


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
                    <div className="countdown animate__animated animate__bounce">
                        <div> {/* Countdown placeholder*/}

                            <h1>Prochain Bootcamps</h1>
                            <div>
                                {upcomingEvents.map(({ eventName }) => (
                                    <div className={`${eventName} js-tilt`} key={eventName}>
                                        <h3 >{eventName}</h3>
                                        <div>
                                            <span className="days"></span>
                                            
                                            <span> Jours</span>
                                        </div>
                                        <div>
                                            <span className="hours"></span>
                                            <span> Heurs</span>
                                        </div>
                                        <div>
                                            <span className="minutes"></span>
                                            <span> Minutes</span>
                                        </div>
                                        <div>
                                            <span className="seconds"></span>
                                            <span> Secondes</span>
                                        </div>
                                    </div>
                                ))}
                            </div>


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
                        <div>
                            <button onClick={buttonCallback}>Découvrir</button>
                        </div>

                    </div>


                </div>
            }

        </div>
    );

};


