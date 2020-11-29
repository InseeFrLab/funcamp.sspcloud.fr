import { createRouter, defineRoute } from "type-route";
import { makeThisModuleAnExecutableRouteLister } from "github-pages-plugin-for-type-route";

const publicUrl = process.env["PUBLIC_URL"]

const root = publicUrl ? defineRoute(publicUrl) : { "extend": defineRoute };

const routeDefs = {
  "countdown": root.extend("/"),
  "home": root.extend("/home")
};

makeThisModuleAnExecutableRouteLister(routeDefs);

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs);

