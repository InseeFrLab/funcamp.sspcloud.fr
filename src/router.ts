import { createRouter, defineRoute } from "type-route";

export const { RouteProvider, useRoute, routes } = createRouter({
  "countdown": defineRoute("/funcamp"),
  "home": defineRoute("/funcamp/home")
});

