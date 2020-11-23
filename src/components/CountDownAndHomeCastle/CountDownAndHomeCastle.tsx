
import React, { useCallback } from "react";
import styles from "./CountDownAndHomeCastle.scss";
import { routes } from "../../router";
import { useAsyncAbortable } from "react-async-hook";
import type { Route } from "type-route";
import { createGroup } from "type-route";
import tchapImg from "./tchap.png";
import inseeFrLabImg from "./inseeFrLab.png";
import icariusImg from "./icarius.png";
import "animate.css/animate.css";

declare const $: Function | undefined;

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

    const openDoc = useCallback(
        () => window.open("https://docs.funcamp.sspcloud.fr/demarage_rapide"),
        []
    );

    const scrollDown = useCallback(
        () => window.scrollBy(0, window.innerHeight),
        []
    );

    return (
        <div
            className={`
        CountDownAndHomeCastle 
        ${(route.name === "home" || isTransitioningToHome) ? "homepageState" : ""}
      `}
        >
            <div className="castle">
                {route.name === "countdown" && <Countdown />}
                {route.name === "home" && (
                    <div className="home">

                        <div className="animate__animated animate__backInDown">
                            <img src={icariusImg} alt="Icarius game logo" className="js-tilt" />
                        </div>

                        <div className="animate__animated animate__backInRight">

                            <h1>Une expérience vidéoludique d'apprentissage R</h1>
                            <h3>L’épopée statistico-ludique dont vous êtes le héros / l’héroïne.</h3>

                        </div>

                        <div className="animate__animated animate__backInUp">

                            <div>
                                <button
                                    className="startGameButton"
                                    onClick={openDoc}
                                >Commencer le jeu</button>
                            </div>

                            <div className="animate__animated animate__shakeY animate__delay-2s">
                                <button
                                    className="slideDownButton"
                                    onClick={scrollDown}
                                ></button>
                            </div>


                        </div>

                    </div>
                )}
            </div>

            {route.name === "countdown" &&
                <div className="countdownSidePanel">

                    <div>

                        <h1>Le Funcamp R, de la nostalgie, du fun et du R!</h1>
                        <h2>...saurez-vous percer les mystères du royaume de Statis?</h2>
                        <div>
                            <button onClick={buttonCallback}>Découvrir</button>
                        </div>

                        <div className="links">

                            <a href="https://github.com/InseeFrLab/funcamp.sspcloud.fr">
                                <img src={inseeFrLabImg} alt="InseeFrLab logo" />
                            </a>

                            <a href="https://www.tchap.gouv.fr/#/room/#SSPCloudXDpAw6v:agent.finances.tchap.gouv.fr">
                                <img src={tchapImg} alt="Tchap logo" />
                            </a>

                        </div>

                    </div>


                </div>
            }

        </div>
    );

};

const Countdown: React.FC = () => {

    const { loading: isLoading } = useAsyncAbortable(
        async abortSignal => {

            while (!$ || !$(document).countdown100) {

                await new Promise(
                    resolve => setTimeout(
                        resolve,
                        100
                    )
                );


                if (abortSignal.aborted) {
                    return;
                }

            }

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
            }));

        },
        [],
        {
            "executeOnMount": true,
            "executeOnUpdate": true
        }
    );

    return (
        <div className="countdown">
            <div> {/* Countdown placeholder*/}

                <h1>Prochain Bootcamps</h1>
                <div>
                    {upcomingEvents.map(({ eventName }) => (
                        <div
                            className={`${eventName} js-tilt`}
                            key={eventName}
                            style={{ "visibility": isLoading ? "hidden" : "unset" }}
                        >
                            <h3 >{eventName}</h3>
                            <div>
                                <span className="days"></span>

                                <span> Jours</span>
                            </div>
                            <div>
                                <span className="hours"></span>
                                <span> heure</span>
                            </div>
                            <div>
                                <span className="minutes"></span>
                                <span> min</span>
                            </div>
                            <div>
                                <span className="seconds"></span>
                                <span> sec</span>
                            </div>

                        </div>
                    ))}
                </div>


            </div>
        </div>
    );

};


