FROM node:20-alpine

WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./

# Install dependencies once
RUN npm ci

# Copy rest of the app
COPY . .

WORKDIR /app/app

ENV CI=true
ENV NG_CLI_ANALYTICS=false

EXPOSE 4200

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll=500"]