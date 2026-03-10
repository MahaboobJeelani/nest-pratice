import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './models/book.model';
import { Model } from 'mongoose';
import { CreateBookInput } from './dto/create-book.inputs';
import { UpdateBookInput } from './dto/update-book.inputs';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

    async createBook(input: CreateBookInput): Promise<Book> {
        const created = new this.bookModel(input)
        return created.save();
    }

    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec()
    }

    async findOne(id: string): Promise<Book | null> {
        const book = await this.bookModel.findById(id).exec()
        return book;
    }

    async updateBook(input: UpdateBookInput): Promise<Book | null> {
        const { id, ...updateData } = input;
        const existingBook = await this.bookModel.findByIdAndUpdate(id,
            updateData,
            { new: true }
        )
        if (!existingBook) throw new NotFoundException("Book Not Found")
        // Object.assign(existingBook, input)
        return existingBook.save()
    }

    async remove(id: string): Promise<boolean> {
        const findBook = await this.bookModel.findByIdAndDelete(id)
        if (!findBook) throw new NotFoundException("Book Not Found")
        return true
    }
}
