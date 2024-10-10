import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from "./models/book.model";
import { User } from "./models/user.model";
import { Category } from "./models/category.model";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [ SequelizeModule.forRoot({
    dialect: 'sqlite',
    host: ':memory:',
    autoLoadModels: true,
    synchronize: true,
  }),
  SequelizeModule.forFeature([Book, User, Category]),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}