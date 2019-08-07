import { Service } from "typedi";

@Service()
export class DateGenerator {
  now: Date;

  constructor() {
    this.now = new Date();
  }

  generate() {
    // var now = new Date();
    var year = this.now.getFullYear();
    var month = this.now.getMonth() + 1;
    var date = this.now.getDate();
    var hour = this.now.getHours();
    var min = this.now.getMinutes();
    var sec = this.now.getSeconds();
    var timestamp =
      year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
    return timestamp;
  }
}
