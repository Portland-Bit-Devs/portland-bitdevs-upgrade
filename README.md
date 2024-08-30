# Portland BitDevs-Upgrade

[![Netlify Status](https://api.netlify.com/api/v1/badges/3dabcadd-d728-4a01-b01e-b7a556e40c29/deploy-status)](https://app.netlify.com/sites/bitdevs-upgrade/deploys)

[![Generate AI Summaries](https://github.com/atlantabitdevs/bitdevs-upgrade/actions/workflows/process-event.yml/badge.svg)](https://github.com/atlantabitdevs/bitdevs-upgrade/actions/workflows/process-event.yml)

This is a project to improve the UX of BitDevs websites and add AI generated summaries to help new attendees.

![BitDevs Upgrade](https://github.com/atlantabitdevs/bitdevs-upgrade/raw/main/public/bitdevs-upgrade.jpg)

## AI Scraper and Summarizer

[How to setup repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

- Add repository secret `OPENAI_API_KEY` -> your Open AI API Key
- Add repository secret `GH_TOKEN` -> A github access token with enough access to commit files and submit a PR
- These secrets will enable the github action to summarize the event markdown files using OpenAI.
- The `ai` directory is independent from the website and runs and builds separately. If you want to run it locally:

```
cd ai
# Make a .env file inside the ai directory and add your OPENAI_API_KEY
yarn install
yarn start
```

- It will pick markdown files inside `content/events` directory starting with a date in `yyyy-mm-dd`.
- Only the most recent file sorted by date will be summarized.
- Once the Github action finishes the building the summary, it will submit a PR to the repo. If the PR is merged, the repo builds and deploys to production and summaries are visible on the website.

## Figma Design

Follow design work here: https://www.figma.com/file/4bV8cJBpreCpWwJ55uk9Rb/BitDevs-Upgrade?type=design&node-id=7%3A10&mode=design&t=Wz7ivmd0ZRi69Vqx-1

## Frontend Template

The frontend is a NextJS website. See below for NextJS details.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server.  You can possibly use `npm run` for this, BUT when you build and run the site for deployment
  you will use `yarn build` and `yarn start`.   NOTE: You need to create a `.env` file in project root, with the OpenAI and Github tokens.
  Only need the Github token var if you are hooking to a Github action.

```bash
yarn install
yarn build
yarn summarize

docker build . -t djangofan/bitdevs-pdx
```

See the `Dockerfile` in this project for exact broken down commands to compile and run the site.

    yarn start

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Adding Pages To Content

To add another Markdown page to this site, just copy a new .md file into the `app/content/events/` folder.

Then rebuild the site and re-publish the container.

    docker login
    docker push djangofan/bitdevs-pdx:latest

## (optional) Run in Docker Using Docker Compose

The `Dockerfile` describes how the container is assembled and the project is built.   You might not deploy it this
  way though, unless you own the server, since deploying live containers via SASS is the most expensive way to do it.

To run in Docker, run 2 commands:

    docker login
    docker build . -t bitdevs-site
    docker-compose up

OR, do this

    docker login
    docker run -d -p 80:3000 djangofan/bitdevs:latest

## Publish Image To Docker Hub

Periodically, need to update this repo, rebuild the code, then rebuild the container, and finally push the container to Docker Hub registry.

