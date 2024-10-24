# Backend

The backend is the logic processor of the service...

## How to run

1. Clone the repo
2. `cd backend`
3. Install dependencies with `deno install`
4. Set up the `.env` file keys.
5. Start up the development container for DOCKER (optional)
6. Add the database columns & types with `deno task db-push && deno task db-generate`
7. Run `deno task start-backend` to start the backend service.

You can test all the backend services by running the backend & also running the tests parallel to it with `deno task start-test`
