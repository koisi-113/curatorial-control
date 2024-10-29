import { Controller, Get, Render, Res } from "@nestjs/common";

@Controller()
export class AppController {

  @Get("/")
  redirectToBooks(@Res() res:any) {
    return res.redirect("/books");
  }

  @Get("/top")
  @Render("top_page.njk")
  showTopPage(res: any){
    return;
  }
}