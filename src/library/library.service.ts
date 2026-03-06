import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Library } from './schemas/library.schema';
import { LibraryModule } from './library.module';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class LibraryService {
    constructor(
        @InjectModel(Library.name) private libraryModel: Model<Library>,
        @InjectModel(Book.name) private bookModel: Model<Book>
    ) { }

    async createBook(): Promise<Library> {
        const book1 = new this.bookModel({
            title: "Js ka Compion",
            author: "Mahaboob"
        }).save()

        const book2 = new this.bookModel({
            title: "HTML ka campion",
            author: "Nayeem"
        }).save()

        const library = new this.libraryModel({
            name: "Maha Library",
            books: [(await book1)._id, (await book2)._id]
        }).save()

        return library
    }

    async getLibrary():Promise<Library[]>{
        return this.libraryModel.find().populate("books").exec()
    }
}

