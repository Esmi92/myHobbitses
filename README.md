# Project description

**myHobbitses** is a project created as an example of two types of technical documentation:
- API documentation based on **OpenAPI** standards
- Classical repository documentation through a`README.md` file

Throughout my career as a developer, I have created multiple documentation sets for internal processes and repositories. Since that documentation is confidential, I cannot share it as a reference of my work. However, most of the documentation I have written has been through **GitHub**, **Confluence** by Atlassian, or—less frequently but still with experience—using **OpenAPI** standards.
This repository contains two of the three types of documentation I am most proficient with. 

## Why Hobbitses?

This section is not technical; it simply provides context on why I chose the theme for this project.

I could have created a dummy OpenAPI file in either YAML or JSON, but I decided that if I was going to document an API project, I might as well create the project itself.

My initial idea was to build a project that accessed a database containing my hobbies. To keep it simple and move quickly, I started with just one hobby: *hiking*.

The word *hobby* is phonetically similar to *hobbit*. Fans of *The Lord of the Rings* know that hobbits do a lot of hiking. Since I wanted to begin my hobbies list with hiking spots, this connection felt fitting.

Now, the correct plural of *hobbit* is *hobbits*. However, one particular character—Gollum/Smeagol—famously calls them *hobbitses*. In the films, he serves as their guide on their “hiking” mission, making him the most knowledgeable about the land and its paths. That is why I decided to name the app after his unique way of referring to hobbits.

# Project details

## Project structure

A larger project would typically include more folders (e.g., for utilities, middleware, configuration, etc.). In this case, the structure is simple:

```
├── types/
│   ├── swagger-jsdoc.d.ts
│   └── swagger-ui-express.d.ts
├── .gitignore
├── constants.ts
├── firebase.ts
├── index.ts
├── package.json
├── routes.ts
└── tsconfig.json
```

## Data Base connection 

For this project, I chose a non-relational database. Since this is a simple example, the flexibility of a non-relational structure is sufficient.

### Why Realtime Firebase?

- I chose **Google** because of its accuracy, speed, and excellent portfolio of tools for computing, storage, and project administration.
- I chose **Firebase** because it provides exactly what I need: a real-time synchronized database with a JSON structure and straightforward rules management

For this project, I am using the Admin SDK to connect my Node.js API requests to the database. 

## Why TypeScript? 

For a project this simple, JavaScript could handle the required logic. However, if I want scalability, TypeScript offers a consistent structure that helps maintain code quality and enforce good practices.

## Authentication 

I created an **IAM** role with *Firebase Realtime Database* Admin access. This role is linked to a service account in my personal GCP suite, allowing me to make authorized modifications to the database locally.

In the future, I plan to add a JWT token validation layer to connect this project with other applications and allow authenticated users to make modifications.

# OpenAPI documentation

This project currently has only two Express routes:

- **GET** - Retrieve the list of all hiking spots
- **POST** - Add a new hiking spot

I created the documentation using two **Swagger** dependencies: 
- [swagger-jsdoc ](https://www.npmjs.com/package/swagger-jsdoc) – to embed YAML-style syntax in comments
- [ swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) – to provide a UI interface for reviewing the documentation

I chose Swagger because it helps create user-friendly API documentation, among other benefits.

<img width="1504" height="673" alt="Screenshot 2026-02-13 at 8 38 41 a m" src="https://github.com/user-attachments/assets/7eb1305a-0e16-4dbd-9782-f596c122da14" />

## Error handling

Since the project needed to be completed quickly, I only added one type of error:
```
{status: 500, body: "Error fetching data"}
```

In a more complete project, error handling should include multiple cases, such as:
- 400 - Bad request
- 404 - Not found
- 401 - Unauthorized

# Run project 

1. Clone the repository
2. Intall dependencies: `npm install`
3. Run available scripts:
  - `npm run dev`
  - `npm start`

> [!WARNING]
> The project requires a `secret.json` file to make authorized requests to the database. However, the **OpenAPI** documentation is still available locally at:
http://localhost:3000/api_docs/






