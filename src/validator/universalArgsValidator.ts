import { Service } from "typedi";
import { UniversalArgs } from "../args/universalArgs";

@Service()
export class UniversalArgsValidator {
  validate(args: UniversalArgs) {
    if (args.ids !== undefined && (args.limit || args.offset))
      throw new Error(
        `Ids cannot be used together with either limit or offset`
      );

    if (args.limit !== undefined && args.limit > 100)
      throw new Error(`Limit cannot be more than 100.`);

    if (args.limit !== undefined && args.limit < 1)
      throw new Error(`Limit cannot be less than 1.`);

    if (args.offset !== undefined && args.offset < 0)
      throw new Error(`Offset cannot be less than 0.`);

    if (args.sortBy && args.sortBy !== "id")
      throw new Error(`Sort can only be by id`);
  }
}
