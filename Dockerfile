FROM 322926992319.dkr.ecr.us-east-1.amazonaws.com/docker/nodejs:10.15-alpine

ARG COMMIT_HASH=unspecified
LABEL COMMIT_HASH=$COMMIT_HASH
ARG BRANCH_NAME=unspecified
LABEL BRANCH_NAME=$BRANCH_NAME

ENV APP_ROOT /app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN printf '{"commit-hash":"'$COMMIT_HASH'","branch-name":"'$BRANCH_NAME'"}' | tee git.properties

RUN npm install
# RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "npm", "run", "start" ]
