# Games Forum API

Backend for a forum platform where players discuss video games: a catalogue of games,
registered users, and (eventually) discussion threads attached to each game.

The project is an early-stage **NestJS 11 + TypeORM + PostgreSQL** REST API. Right now it
covers the foundation — configuration, database layer, session-based authentication, the
users and games catalogues, and a reusable pagination toolkit. Discussion threads, posts
and comments are not implemented yet (see [Roadmap](#roadmap)).

## Tech stack

| Area       | Choice                                                                                  |
| ---------- | --------------------------------------------------------------------------------------- |
| Runtime    | Node.js (developed on v22), TypeScript 5.7, CommonJS output                              |
| Framework  | NestJS 11 (`@nestjs/platform-express`)                                                   |
| Database   | PostgreSQL via TypeORM (`pg` driver), SQL migrations                                     |
| Auth       | Passport local strategy + `express-session`, sessions stored in Postgres (`connect-pg-simple`) |
| Passwords  | bcrypt                                                                                   |
| Validation | `class-validator` / `class-transformer` (global `ValidationPipe`), Joi for env vars       |
| Tooling    | ESLint 9 + Prettier, Jest (configured, no tests written yet), Yarn                       |

## Getting started

### Requirements

- Node.js 20+ (developed on 22)
- Yarn
- PostgreSQL with the `uuid-ossp` extension available (migrations call `uuid_generate_v4()`)

### Setup

```bash
yarn install
```

Create a `.env` file in the project root. Every variable is required and validated by Joi at
startup, so the app refuses to boot if one is missing:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=games_forum

SESSION_SECRET=some_long_random_string
```

Apply the migrations, then start the API:

```bash
yarn migration:run
yarn start:dev
```

The server listens on `PORT` or `3000`.

### Scripts

| Script                                     | Purpose                                     |
| ------------------------------------------ | ------------------------------------------- |
| `yarn start` / `start:dev` / `start:debug` | Run the app (plain / watch / debug modes)   |
| `yarn start:prod`                          | Run the compiled build (`dist/src/main`)    |
| `yarn build`                               | `nest build`                                |
| `yarn lint`                                | ESLint with `--fix`                         |
| `yarn prettier`                            | Format `src/**/*.ts`                        |
| `yarn migration:generate`                  | Generate a migration from entity changes    |
| `yarn migration:run`                       | Apply pending migrations                    |
| `yarn migration:revert`                    | Roll back the last migration                |
| `yarn migration:show`                      | List migration status                       |

Migrations are driven by `typeorm.config.ts` (a standalone `DataSource`), while the running
app builds its options from `TypeOrmConfigService`. `synchronize` is off everywhere — schema
changes always go through a migration.

## Roadmap

The forum half of the platform is still ahead:

- Threads/topics per game, posts and replies, likes and moderation
- User profiles beyond `id` / `email`, roles and permissions
- Swagger/OpenAPI documentation via the pagination response decorators
- Tests
