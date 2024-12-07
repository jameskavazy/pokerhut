FROM node:20-alpine

WORKDIR  /poker-payout-calculator

COPY package*.json ./
# COPY .env ./.env
COPY prisma ./primsa/

RUN npx prisma generate --schema=./primsa/schema.prisma
RUN npm install


COPY . .

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

