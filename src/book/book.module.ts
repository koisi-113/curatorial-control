import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { Book } from "../models/book.model";
import { CategoryModule } from "../category/category.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Book]),
    CategoryModule,
    UserModule
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})

export class BookModule {}