FROM node:18-alpine
EXPOSE 3000
EXPOSE 3001
EXPOSE 3002

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/
COPY .env /home/app/

COPY AccountService/dist/ /home/app/AccountService/dist/
COPY AccountService/package.json /home/app/AccountService/
COPY AccountService/package-lock.json /home/app/AccountService/

COPY MessageService/dist/ /home/app/MessageService/dist/
COPY MessageService/package.json /home/app/MessageService/
COPY MessageService/package-lock.json /home/app/MessageService/

COPY ProductService/dist/ /home/app/ProductService/dist/
COPY ProductService/package.json /home/app/ProductService/
COPY ProductService/package-lock.json /home/app/ProductService/

COPY ImageService/build/ /home/app/ImageService/build/
COPY ImageService/public/ /home/app/ImageService/public/
COPY ImageService/package.json /home/app/ImageService/
COPY ImageService/package-lock.json /home/app/ImageService/

COPY UserApp/.next/ /home/app/UserApp/.next/
COPY UserApp/package.json /home/app/UserApp/
COPY UserApp/package-lock.json /home/app/UserApp/
COPY UserApp/next-i18next.config.js/ /home/app/UserApp/
COPY UserApp/next.config.js/ /home/app/UserApp/
COPY UserApp/public/ /home/app/UserApp/public/

COPY AdminApp/.next/ /home/app/AdminApp/.next/
COPY AdminApp/package.json /home/app/AdminApp/
COPY AdminApp/package-lock.json /home/app/AdminApp/
COPY AdminApp/public/ /home/app/AdminApp/public/

COPY ModeratorApp/.next/ /home/app/ModeratorApp/.next/
COPY ModeratorApp/package.json /home/app/ModeratorApp/
COPY ModeratorApp/package-lock.json /home/app/ModeratorApp/
COPY ModeratorApp/public/ /home/app/ModeratorApp/public/

RUN npm run cis

CMD npm run start