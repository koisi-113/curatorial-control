import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../models/book.model';
import { User } from '../models/user.model';
import { Category } from '../models/category.model';
import { Op } from 'sequelize';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { DOMParser } from 'xmldom';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async readBooks(): Promise<Book[]> {
    return this.bookModel.findAll({ include: [User, Category] });
  }

  async addBooks() {
    return await this.bookModel.findAll();
  }

  async readBookById(id: number): Promise<Book | null> {
    return await this.bookModel.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["name", "id"],
        },
      ],
    });
  }

  async readBookByName(name: string): Promise<Book[]> {
    return await this.bookModel.findAll({
      where: {
        name: {
          [Op.substring]: name,
        },
      },
    });
  }

  async createBook(
    name: string,
    categoryId: number,
    author: string,
    isbn: string,
    publisher: string,
    is_borrowing: boolean,
    userId: number,
  ): Promise<void> {
    await this.bookModel.create({
      name,
      categoryId,
      author,
      isbn,
      publisher,
      is_borrowing,
      userId,
    });
  }

  async deleteBookById(id: number): Promise<void> {
    await this.bookModel.destroy({ where: { id } });
  }

  async updateBook(
    id: number,
    name: string,
    categoryId: number,
    author: string,
    isbn: string,
    publisher: string,
    is_borrowing: boolean,
    userId: number,
  ): Promise<void> {
    await this.bookModel.update(
      { name, categoryId, author, isbn, publisher, is_borrowing , userId },
      { where: { id } },
    );
  }

  async getBookImageFromNDL(isbn: string): Promise<string | undefined> {
    const apiURL = `https://iss.ndl.go.jp/api/opensearch?isbn=${isbn}&format=xml`;

    try {
        // NDL APIからデータを取得
        const response = await axios.get(apiURL, { responseType: 'text' });
        const xmlText = response.data;

        // xmldom の DOMParser を使用して XML をパース
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        // 最初の <item> 要素を取得
        const firstItem = xmlDoc.getElementsByTagName("item")[0];
        if (!firstItem) {
            console.error("該当する書籍が見つかりません。");
            return;
        }

        // 書籍の詳細ページURLを取得
        const link = firstItem.getElementsByTagName("link")[0]?.textContent;
        if (!link) {
            console.error("書籍詳細ページのリンクが見つかりません。");
            return;
        }

        //console.log("書籍ページURL:", link);

        // 書籍ページから画像URLを取得
        const bookPageResponse = await axios.get(link);
        const bookPageHTML = bookPageResponse.data;

        // cheerioでHTMLをパースして画像URLを抽出
        const $ = cheerio.load(bookPageHTML);
        const imageUrl = $('meta[property="og:image"]').attr('content');

        if (imageUrl) {
            console.log("画像URL:", imageUrl);
            return imageUrl;
        } else {
            console.error("画像が見つかりません。");
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
    }
  }
  
}
