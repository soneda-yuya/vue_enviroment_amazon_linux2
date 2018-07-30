FROM amazonlinux:2

RUN yum -y install gcc-c++
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y nodejs
RUN node --version && npm  --version
RUN npm i -g yarn && yarn global add vue-cli
RUN mkdir -p /var/www/htdocs/