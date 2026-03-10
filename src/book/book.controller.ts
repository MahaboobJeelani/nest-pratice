import { Body, Controller } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.inputs';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    async createBook(@Body() data: CreateBookInput) {
        return this.bookService.createBook(data)
    }
}
