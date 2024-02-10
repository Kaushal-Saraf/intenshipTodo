FROM node

COPY src src
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

RUN npm install

ENTRYPOINT [ "node","index.ts" ]