import "./Home.scss";
import React from "react";
import { Route } from "type-route";
import { routes } from "../../router";

export const Home: React.FC<{
    route: Route<typeof routes.home>
}> = ()=> <h1 className="Home">Home content</h1>;