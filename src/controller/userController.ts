import "reflect-metadata";
import { Container } from "typedi";
import { CurrentUser } from "../service/currentUser";
import { DateGenerator } from "../service/dateGenerator";

import { Controller, Query, Mutation, ArgsValidator } from "vesper";
import { EntityManager, FindManyOptions, getConnection } from "typeorm";

import { UniversalArgsValidator } from "../validator/universalArgsValidator";
import { UniversalArgs } from "../args/universalArgs";
import { FindOptionsGenerator } from "../service/findOptionsGenerator";

import * as pass from "node-php-password";
import { omit } from "lodash";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";

import { User } from "../entity/user";
import { OAuth2Client } from "google-auth-library";

@Controller()
export class UserController {
  constructor(
    private entityManager: EntityManager,
    private currentUser: CurrentUser,
    private client: OAuth2Client,
    private findOptionsGenetator: FindOptionsGenerator
  ) {
    this.currentUser = Container.get(CurrentUser);
    // let { web: { client_id, client_secret, redirect_uris } } = KEYS;
    // this.client = new OAuth2Client(client_id, client_secret, "http://localhost:8080");
    // this.client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
  } //end-constructor

  @Query()
  @ArgsValidator(UniversalArgsValidator)
  async getUsers(args) {
    const findOptions: FindManyOptions = this.findOptionsGenetator.generate(
      args
    );

    console.log(findOptions);
    return this.entityManager.find(User, findOptions);
  } //end-query-getUsers

  @Mutation()
  async addUsers({ users }) {
    for (let user of users) {
      user["created_at"] = new DateGenerator().generate();
      user["password"] = pass.hash(user.password);
      const result = await this.entityManager
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(JSON.parse(JSON.stringify(user)))
        .execute();
      // if (result["raw"]["affectedRows"] != 0) {
      //   return "Successful";
      // }else {
      //   return "No changed rows";
      // }
      // throw new Error(`Failed to create new user.`);
    }
    return "Successful";
  } //end-mutation-addUsers

  @Mutation()
  async editUsers({ users }) {
    for (let user of users) {
      let update = await this.entityManager
        .createQueryBuilder()
        .update(User)
        .set(JSON.parse(JSON.stringify(user)))
        .where("id = :id", { id: user.id })
        .execute();

      // if (update["raw"]["affectedRows"] != 0) {
      //   return "Successful";
      // }else {
      //   return "No changed rows";
      // }
      // throw new Error(`Update failed`);
    }
    return "Successful";
  } //end-mutation-editUsers

  @Mutation()
  async deleteUsers({ ids }) {
    for (let id of ids) {
      let record = await this.entityManager
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: id })
        .execute();
      // if (record["raw"]["affectedRows"] != 0) {
      //   return "Successful";
      // }else {
      //   return "No changed rows";
      // }
      // throw new Error("Delete failed");
    }
    return "Successful";
  } //end-mutation-deleteUsers

  // ..
} //end-UserController
