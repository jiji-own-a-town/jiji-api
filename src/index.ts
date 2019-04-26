const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

import "reflect-metadata";

import { bootstrap } from "vesper";

import { User } from "./entity/user";

bootstrap({
  port: 4600,
  cors: true,
  controllers: [],
  entities: [User],
  resolvers: [],
  schemas: [__dirname + "/schema/**/*.graphql"]
})
  .then(server => {
    console.log(
      "Your app is up and running on http://localhost:4600. " +
        "You can use playground in development mode on http://localhost:4600/playground"
    );
  })
  .catch(error => {
    console.error(error.stack ? error.stack : error);
  });
