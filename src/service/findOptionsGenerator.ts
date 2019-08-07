import { Service } from "typedi";
import { FindManyOptions, In } from "typeorm";

@Service()
export class FindOptionsGenerator {
  generate(args): FindManyOptions {
    let findOptions: FindManyOptions = {};
    if (args.limit) {
      findOptions.take = args.limit;
    }
    if (args.offset) {
      findOptions.skip = args.offset;
    }
    if (args.sortBy) {
      findOptions.order = {};
      findOptions.order[args.sortBy] = "DESC";
    }
    if (args.ids) {
      findOptions["id"] = In(args.ids);
    }
    return findOptions;
  }
}
