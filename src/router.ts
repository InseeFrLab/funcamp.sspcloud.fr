import { createRouter, defineRoute } from "type-route";

const root = defineRoute(process.env["PUBLIC_URL"]);

export const { RouteProvider, useRoute, routes } = createRouter({
  "countdown": root.extend("/"),
  "home": root.extend("/home")
});

