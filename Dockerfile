FROM node:6

ADD ./app /app
ADD ./run_dev.sh /


RUN cd /app; \
    npm install

CMD ["npm", "start"]