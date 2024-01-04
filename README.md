# Jouno - Travel Social WebApp

Web Application catering to travel enthusiasts, facilitating the sharing of trips and fostering connections. <br />
[Demo Website](https://jouno.vercel.app)

![go_logo](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white) ![ts_logo](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![pg_logo](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![aws_logo](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white) ![next_logo](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![redux_logo](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![tw_logo](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![docker_logo](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## Demo

![home](https://raw.githubusercontent.com/pratikstemkar/jouno/main/.github/images/home.png)

![login](https://raw.githubusercontent.com/pratikstemkar/jouno/main/.github/images/create.png)

![register](https://raw.githubusercontent.com/pratikstemkar/jouno/main/.github/images/register.png)

![create](https://raw.githubusercontent.com/pratikstemkar/jouno/main/.github/images/create.png)

![profile](https://raw.githubusercontent.com/pratikstemkar/jouno/main/.github/images/profile.png)

## Usage

1. Run using `docker-compose`

```bash
docker-compose up --build
```

2. Development Setup
    1. Start Postgres Docker Container
    ```bash
    docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
    ```
    2. Start backend Go server
    ```bash
    go mod tidy
    make docker-run
    make run
    ```
    3. Start frontend Next.js app
    ```bash
    cd web
    npm i
    npm run dev
    ```

## Contribute

Contributions are always welcome! Please create an [issue](https://github.com/pratikstemkar/jouno/issues) explaining the proposed changes before proceeding.

Made with :heart: by [pratikstemkar](https://pratikstemkar.in).
