FROM amazonlinux:2

RUN yum -y install gcc-c++
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y nodejs
RUN node --version && npm  --version
RUN npm i -g yarn && yarn global add vue-cli && yarn add express-vue && yarn global add nodemon -g && yarn global add webpack-hot-middleware
RUN mkdir -p /var/www/htdocs/ && cd /var/www/htdocs/ && yarn add babel-cli babel-preset-stage-0 babel-preset-env