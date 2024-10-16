import { Controller, Get, Res } from "@nestjs/common";

@Controller()
export class AppController {

  @Get("/")
  redirectToBooks(@Res() res:any) {
    return res.redirect("/books");
  }
}