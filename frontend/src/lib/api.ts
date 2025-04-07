import { hc } from 'hono/client';
import {type APIRoutes } from '@server/index'

const client = hc<APIRoutes>('/');
 type Client = typeof client

const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<APIRoutes>(...args)

const api = hcWithType;