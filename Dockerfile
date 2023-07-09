# Koristi oficijelni Node.js sliku kao baznu
FROM node:14-alpine

# Postavi radni direktorijum unutar kontejnera
WORKDIR '/app'

# Kopiraj package.json i package-lock.json
COPY package*.json ./

# Instaliraj zavisnosti
RUN npm install

# Kopiraj sve fajlove iz trenutnog direktorijuma u kontejner
COPY . .

# Pokreni React aplikaciju
CMD ["npm", "start"]
