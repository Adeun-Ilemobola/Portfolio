import { type APIRoutes } from "@server/src/index";

import { hc } from "hono/client";

// Create client instance to fetch API endpoints from server
const client = hc<APIRoutes>('/')


export const  api = client.api