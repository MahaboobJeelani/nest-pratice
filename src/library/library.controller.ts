import { Controller, Get, Post } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
    constructor(private readonly libraryService: LibraryService) { }

    @Post()
    async createLibrary() {
        return this.libraryService.createBook()
    }

    @Get()
    async getLibrary() {
        return this.libraryService.getLibrary()
    }
}
