import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';

@Controller('exception')
export class ExceptionController {
    @Get('hello/:id')
    @UseFilters(HttpExceptionFilter)
    getHello(@Param("id", ParseIntPipe) id: number) {
        return { message: "Hello world" }
    }
}
