FROM node:20-alpine

WORKDIR /app

RUN npm install -g @angular/cli

ENV CI=true
ENV NG_CLI_ANALYTICS=false

EXPOSE 4200

CMD ["sh", "-c", "npm install && npx ng serve --host 0.0.0.0 --poll 2000"]
