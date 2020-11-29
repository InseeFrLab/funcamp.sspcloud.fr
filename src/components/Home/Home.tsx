import "./Home.scss";
import React, { useCallback } from "react";
import { Route } from "type-route";
import { routes } from "../../router";
import gameScreenshotImg from "./game_screenshot.png";


export const Home: React.FC<{
    route: Route<typeof routes.home>
}> = ()=> {

    return (
        <div className="Home">

            <section className="scheme">

                <div>
                    <h1>Funcamp R</h1>
                    <h3>Un jeu et des tutoriels pour apprendre R</h3>
                    <p> 
                        <span style={{ "fontSize": "75%" }}>Le Funcamp R s'adresse avant tout à celles et ceux qui, petits et grands 
                        débutants en R, souhaitent inscrire leur apprentissage dans une démarche amusante, 
                        où des phases de jeu et des phases de pratiques en R alternent. Il a été conçu pour 
                        les agents du système statistique public, qui retrouveront dans l'aventure d'icaRius 
                        quelques clins d'oeil à leur environnement professionnel - tous peuvent néanmoins s'essayer 
                        à ce parcours pédagogique, même sans travailler à l'Insee ou dans un service statistique ministériel.</span>
                    </p>

                    <button
                        onClick={useCallback(() => window.open("https://docs.funcamp.sspcloud.fr/demarrage_rapide"), [])}
                    >Accéder au jeu et aux tutoriels R</button>

                </div>


                <iframe title="youtube vieo" width="560" height="315" src="https://www.youtube.com/embed/Quz2CfF0gmo?start=13" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>


            </section>

            <section className="sep">

                <h1>Petits et grands débutants en R</h1>

                <p>
                    La composante dédiée aux techniques statistiques est délibèrement très 
                    restreinte : il s'agit surtout d'apprendre à maîtriser le cadre 
                    général de l'environnement R, d'autres formations plus avancées 
                    répondant aux besoins des statisticiens avertis.
                </p>



            </section>


            <section className="scheme">

                <div>
                    <h1>La documentation</h1>
                    <h3>Un espace pour les formateurs et un autre pour les développeurs</h3>
                    <p> 
                        <span style={{ "fontSize": "75%" }}>Pour les esprits curieux, vous pouvez consulter la documentation 
                        qui regroupe des informations complémentaires sur le projet (la philosophie 
                        du projet, son histoire, ses acteurs... et son possible devenir), 
                        un espace dédié aux ressouces pour les formateurs (principes pédagogiques et 
                        présentation de la trame suivie) et pour les développeurs, un ensemble de ressources 
                        pour contribuer au développement du grimoire de tutoriels R et du jeu icaRius.</span>
                    </p>

                    <button
                        onClick={useCallback(() => window.open("https://docs.funcamp.sspcloud.fr/espace-formateur/principes_pedagogiques"), [])}
                    >Consulter la documentation</button>

                </div>

                
                <img src={gameScreenshotImg} alt="game screenshot"/>


            </section>



        </div>

    )

};
