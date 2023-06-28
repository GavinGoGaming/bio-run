FROM openjdk:17-oracle
# All we want to do is make start.sh executable, copy it (and the folders "server" and "client") to the workdir /app, and run it.
# We also want to expose port 25565, which is the default port for Minecraft servers.
# AND expose port 3000 for the webserver (eaglercraft)
ENV NODE_VERSION=16.13.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
EXPOSE 25565 3000
WORKDIR /app
COPY start.sh .
RUN chmod +x start.sh
COPY server server
COPY client client
CMD ["./start.sh"]