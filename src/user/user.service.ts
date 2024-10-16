import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../models/user.model";

@Injectable()
export class UserService {
 constructor(
  @InjectModel(User)
  private userModel: typeof User,
 ){}

 async readUsers() {
  return await this.userModel.findAll();
}

async createUser(name: string,grade: string): Promise<void> {
  await this.userModel.create({ name,grade });
}
}