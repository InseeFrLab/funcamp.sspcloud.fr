import React, { useCallback, useMemo } from "react";
import styles from "./CountDownAndHomeCastle.scss";
import { routes } from "../../router";
import { useAsyncAbortable } from "react-async-hook";
import type { Route } from "type-route";
import { createGroup } from "type-route";
import tchapImg from "./tchap.png";
import inseeFrLabImg from "./inseeFrLab.png";
import icariusImg from "./icarius.png";
import "animate.css/animate.css";
import { getEvtTimeRemaining, CountdownTargetDate, isEndedFromMoreThan8Hours } from "./timeRemaining";
import { useStatefulEvt } from "evt/hooks";
import useSound from 'use-sound';
import teleportFx from "./teleportFx.mp3";

export const routeGroup = createGroup([
    routes.home,
    routes.countdown
]);

const upcomingEvents: { [eventName: string]: { countdownTargetDate: CountdownTargetDate; eventPageUrl: string } } = {
    "Orléans": {
        "countdownTargetDate": {
            "endtimeYear": 2020,
            "endtimeMonth": 11,
            "endtimeDate": 24,
            "endtimeHours": 11
        },
        "eventPageUrl": "https://funcamp-funcamp.gitbook.io/evenements/orlean_24_11_20"
    },
    "e-Funcamp": {
        "countdownTargetDate": {
            "endtimeYear": 2020,
            "endtimeMonth": 12,
            "endtimeDate": 15,
            "endtimeHours": 9
        },
        "eventPageUrl": "https://funcamp-funcamp.gitbook.io/evenements/e-funcamp_15_12_20"
    },
    "Nouvelle Aquitaine": {
        "countdownTargetDate": {
            "endtimeYear": 2021,
            "endtimeMonth": 4,
            "endtimeDate": 27,
            "endtimeHours": 9
        },
        "eventPageUrl": "https://funcamp-funcamp.gitbook.io/evenements/nouvelle_aquitaine_2021"
    }
};



export const CountDownAndHomeCastle: React.FC<{
    route: Route<typeof routeGroup>;
}> = params => {

    const { route } = params;

    const [playTeleportFx] = useSound(teleportFx);

    const {
        execute: buttonCallback,
        loading: isTransitioningToHome
    } = useAsyncAbortable(
        async abortSignal => {

            playTeleportFx();

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
        () => window.open("https://funcamp-funcamp.gitbook.io/demarrage_rapide"),
        []
    );

    const scrollDown = useCallback(
        () => window.scrollBy(0, window.innerHeight),
        []
    );

    const conditionalPlural = useMemo(
        () =>
            Object.keys(upcomingEvents)
                .map(eventName => upcomingEvents[eventName].countdownTargetDate)
                .map(countdownTargetDate => getEvtTimeRemaining(countdownTargetDate))
                .filter(evtTimeRemaining => !isEndedFromMoreThan8Hours(evtTimeRemaining.state))
                .length === 1 ? "" : "s",
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
                {route.name === "countdown" &&

                    <div className="countdown">
                        <div> {/* Countdown placeholder*/}
                            {(() => {

                                const countdowns = Object.keys(upcomingEvents)
                                    .map(eventName => <Countdown
                                        countdownTargetDate={upcomingEvents[eventName].countdownTargetDate}
                                        eventPageUrl={upcomingEvents[eventName].eventPageUrl}
                                        eventName={eventName}
                                        key={eventName}
                                    />)
                                    .filter(node => node !== null);

                                return (
                                    <>
                                        {countdowns.length !== 0 &&
                                            <h1>Prochain{conditionalPlural} évènement{conditionalPlural}</h1>}
                                        <div> {countdowns} </div>
                                    </>
                                );

                            })()}
                        </div>
                    </div>


                }
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

                        <h1>Le Funcamp R...</h1>
                        <h2>...saurez-vous percer les mystères du royaume de Statis ?</h2>
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



const Countdown: React.FC<{
    countdownTargetDate: CountdownTargetDate;
    eventName: string;
    eventPageUrl: string;
}> = params => {

    const { countdownTargetDate, eventName, eventPageUrl } = params;


    const evtTimeRemaining = useMemo(
        () => getEvtTimeRemaining(countdownTargetDate),
        [countdownTargetDate]
    );


    useStatefulEvt([evtTimeRemaining]);

    const { days, hours, minutes, seconds, total } = evtTimeRemaining.state;

    const openEventPage = useCallback(
        () => window.open(eventPageUrl),
        [eventPageUrl]
    );

    if (isEndedFromMoreThan8Hours(evtTimeRemaining.state)) {
        return null;
    }

    return (
        <div
            className={`${eventName} js-tilt`}
            key={eventName}
            onClick={openEventPage}
            style={{ "cursor": "pointer" }}
        >
            <h3>{eventName}</h3>

            { total < 0 ?
                <h2>En cours maintenant</h2> : (
                    <>
                        {
                            days !== 0 &&
                            <div>
                                <span>{days}</span>
                                <span> Jour{days === 1 ? "" : "s"}</span>
                            </div>
                        }
                        {
                            hours !== 0 &&
                            <div>
                                <span>{hours}</span>
                                <span> h</span>
                            </div>
                        }
                        {
                            days === 0 &&
                            <div>
                                <span>{minutes}</span>
                                <span> min</span>
                            </div>
                        }
                        {
                            days === 0 && hours === 0 &&
                            <div>
                                <span>{seconds}</span>
                                <span> sec</span>
                            </div>
                        }
                    </>)}
        </div>

    );


};


