import "reflect-metadata";
import { Container } from "typedi";

import { Controller, Query, Mutation, ArgsValidator } from "vesper";
import { EntityManager, FindManyOptions, getConnection } from "typeorm";

import { UniversalArgsValidator } from "../validator/universalArgsValidator";
import { UniversalArgs } from "../args/universalArgs";
import { FindOptionsGenerator } from "../service/findOptionsGenerator";

import { Role } from "../entity/role";

@Controller()
export class RoleController {
  constructor(
    private entityManager: EntityManager,
    private findOptionsGenetator: FindOptionsGenerator
  ) {}

  @Query()
  @ArgsValidator(UniversalArgsValidator)
  async getRoles(args) {
    const findOptions: FindManyOptions = this.findOptionsGenetator.generate(
      args
    );

    console.log(findOptions);
    return this.entityManager.find(Role, findOptions);
  }

  @Mutation()
  async addRoles({ roles }) {
    for (let role of roles) {
      const result = await this.entityManager
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values(JSON.parse(JSON.stringify(role)))
        .execute();
      // if (result["raw"]["affectedRows"] != 0) {
      //   return "Successful";
      // }else {
      //   return "No changed rows";
      // }
      // throw new Error(`Create failed`);
    }
    return "Successful";
  }
  @Mutation()
  async editRoles({ roles }) {
    for (let role of roles) {
      let update = await this.entityManager
        .createQueryBuilder()
        .update(Role)
        .set(JSON.parse(JSON.stringify(role)))
        .where("id = :id", { id: role.id })
        .execute();
      // if (update["raw"]["affectedRows"] != 0) {
      //   return "Successful";
      // }else {
      //   return "No changed rows";
      // }
      // throw new Error(`Update failed`);
    }
    return "Successful";
  }

  @Mutation()
  async deleteRoles({ ids }) {
    for (let id of ids) {
      let record = await this.entityManager
        .createQueryBuilder()
        .delete()
        .from(Role)
        .where("id = :id", { id: id })
        .execute();
      // if (record["raw"]["affectedRows"] != 0) {
      //   return "Successful";
      // }else {
      //   return "No changed rows";
      // }
      // throw new Error(`Delete failed`);
    }
    return "Successful";
  }
}
