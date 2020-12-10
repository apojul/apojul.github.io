FROM node:12.20.0

ENV NODE_ENV=production
WORKDIR  /app

COPY package*.json ./
RUN npm install -q
COPY . .

EXPOSE 3030
CMD ["npm", "run", "start"]