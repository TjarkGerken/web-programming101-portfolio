# DHBW Mannheim - Web Programming

This repository contains the code for the project of the course Web Programming at the DHBW Mannheim. The aim was to
build an interactive Webapp in Vue.js and use Firebase as a BaaS Provider.

## Project Description 🇩🇪

<!-- TODO:  Update at the end -->

Implementierung der CRUD Funktionen:

- **C**reate: Erstellen von neuen Goals und Aktivitäten
- **R**ead: Anzeigen von Goals und Aktivitäten und Profile
- **U**pdate: Bearbeiten vom Profil
- **D**elete: Löschen von Goals und Aktivitäten

## Project Setup for Development

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# Run Prod Version locally via Docker

## Build Docker Image:

```sh
 docker build . -t webprogramming
```

## Pull Docker Image:

```sh
docker pull tjarkger/web-programming101
```

## Run via Docker:

```sh
docker run -d -p 8080:80 tjarkger/web-programming101 #add env variables for the website to run
```

Open page on: http://localhost:8080/
