# spring-ecommerce

Full-stack sample e-commerce storefront: browse products by category, search by name, and view product details. The Angular client talks to a Spring Data REST API backed by MySQL.

## Overview

This repository is a monorepo with two applications. The **backend** exposes read-only REST resources for categories and products (pagination and search included). The **frontend** is a standalone Angular app with SSR support that consumes those APIs for listing, search, and detail views.

Stack highlights: Spring Boot 3.3, Spring Data JPA/REST, MySQL 8, Angular 18, Bootstrap 5.

## Features

- Category navigation and paginated product listings per category
- Product search by name (debounced search bar)
- Product detail page with pricing and image
- Spring Data REST HAL endpoints under `/api`
- Read-only API exposure (POST, PUT, DELETE disabled on products and categories)
- Optional Angular SSR via Express (`server.ts`)

## Tech stack

| Layer | Technologies |
|-------|----------------|
| Frontend | Angular 18, RxJS, Bootstrap 5, TypeScript 5.4 |
| Backend | Spring Boot 3.3.0, Spring Data JPA, Spring Data REST, Lombok |
| Database | MySQL 8 |
| Build | Maven (backend), Angular CLI / npm (frontend) |

## Prerequisites

- **Java 21** and **Maven 3.9+** (or use `./mvnw` in `be-ecommerce`)
- **Node.js 18+** and **npm**
- **Angular CLI 18** (`npm install -g @angular/cli`) for local `ng` commands
- **MySQL 8** server running locally

## Getting started

### Clone

```powershell
git clone https://github.com/vonmiller1/spring-ecommerce.git
cd spring-ecommerce
```

### Database setup

1. Run the SQL scripts in order from `be-ecommerce/src/main/resources/sql/`:
   - `01-create-user.sql` — creates the `ecommerceapp` MySQL user
   - `02-create-products.sql` — creates schema, tables, and seed categories
   - `03-refresh-db-with-100-products.sql` — optional extra product data
2. Configure credentials (see [Configuration](#configuration)).

## Running locally

### Backend (`be-ecommerce`)

```powershell
cd be-ecommerce
./mvnw spring-boot:run
```

On Windows:

```powershell
cd be-ecommerce
.\mvnw.cmd spring-boot:run
```

API base URL: `http://localhost:8080/api` (e.g. `http://localhost:8080/api/products`).

### Frontend (`fe-ecommerce`)

```powershell
cd fe-ecommerce
npm install
npm start
```

Dev server: `http://localhost:4200` (proxies API calls to the backend URL in environment files).

Production build:

```powershell
npm run build
```

SSR production serve (after build):

```powershell
npm run serve:ssr:fe-ecommerce
```

Default SSR port: **4000** (override with `PORT`).

## Testing

Documented only (not executed in CI for this repo pass):

| App | Command |
|-----|---------|
| Backend | `cd be-ecommerce` then `./mvnw test` |
| Frontend | `cd fe-ecommerce` then `npm test` |

## Project structure

```
spring-ecommerce/
├── README.md
├── be-ecommerce/                 # Spring Boot API
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/lucode/be_ecommerce/
│       │   ├── BeEcommerceApplication.java
│       │   ├── config/RestConfig.java
│       │   ├── dao/              # JPA repositories
│       │   └── entity/           # Category, Product
│       └── resources/
│           ├── application.properties
│           └── sql/              # MySQL setup scripts
└── fe-ecommerce/                 # Angular SPA (+ SSR)
    ├── angular.json
    ├── package.json
    ├── server.ts                 # Express SSR entry
    └── src/app/
        ├── components/           # UI building blocks
        ├── pages/                # Home, product detail
        ├── services/             # HTTP clients for API
        └── environments/         # API base URLs
```

## Configuration

Backend datasource settings in `be-ecommerce/src/main/resources/application.properties`:

| Property / env var | Purpose | Default (local) |
|--------------------|---------|-----------------|
| `DB_USERNAME` / `spring.datasource.username` | MySQL user | `root` |
| `DB_PASSWORD` / `spring.datasource.password` | MySQL password | `root` |
| JDBC URL | Database host and schema | `localhost:3306/ecommerce` |

Set environment variables before starting the backend to avoid committing secrets:

```powershell
$env:DB_USERNAME = "ecommerceapp"
$env:DB_PASSWORD = "your-password"
```

Frontend API hosts are defined in:

- `fe-ecommerce/src/environments/environment.development.ts` (development)
- `fe-ecommerce/src/environments/environment.ts` (production build)

Both default to `http://localhost:8080/api`.

## Deployment

- Build the backend JAR: `cd be-ecommerce && ./mvnw -DskipTests package`
- Build the frontend: `cd fe-ecommerce && npm run build`
- Point environment variables and JDBC URL at your production MySQL instance
- Serve the Angular `browser` output via your web server or use the provided SSR `server.ts` with Node

No Dockerfile or GitHub Actions workflow is included in this repository.

## Contributing

1. Fork the repository and create a feature branch from `main`
2. Keep commits focused; use imperative messages (e.g. `fix(api): …`, `docs(readme): …`)
3. Open a pull request with a short description of the change

## License

No `LICENSE` file is present in this repository. Add a license file before distributing or accepting external contributions.
