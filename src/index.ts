const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

import "reflect-metadata";
import { Container } from "typedi";
import { CurrentUser } from "./service/currentUser";
import { bootstrap } from "vesper";

import { UserController } from "./controller/userController";
import { RoleController } from "./controller/roleController";

import { User } from "./entity/user";
import { Role } from "./entity/role";

bootstrap({
  port: 3000,
  cors: true,
  controllers: [UserController, RoleController],
  entities: [User, Role],
  resolvers: [],
  schemas: [__dirname + "/schema/**/*.graphql"]
})
  .then(server => {
    console.log(
      "Your app is up and running on http://localhost:3000. " +
        "You can use playground in development mode on http://localhost:3000/playground"
    );
  })
  .catch(error => {
    console.error(error.stack ? error.stack : error);
  });
