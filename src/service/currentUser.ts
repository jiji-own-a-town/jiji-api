import { Service } from "typedi";

@Service()
export class CurrentUser {
  id: number;
  name: string;
  token: string;

  constructor(id, name, token) {
    this.id = id;
    this.name = name;
    this.token = token;
  }
}
