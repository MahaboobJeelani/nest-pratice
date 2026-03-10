import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from '../book.service';
import { Book } from '../models/book.model';
import { CreateBookInput } from '../dto/create-book.inputs';
import { UpdateBookInput } from '../dto/update-book.inputs';

// ================================ Query's for graphQL ======================================

// # mutation{
// #   createBook(input:{
// #     title:"NestJS",
// #     author:"Mahaboob"
// #   }){
// #     _id, title, author
// #   }
// # }


// # query{
// #   getAllBooks{
// #     _id, title, author
// #   }
// # }

// # query{
// #   getBook(id:"69aefa3d00402a595603678c"){
// #     _id, title, author
// #   }
// # }

// # mutation{
// #   deleteBook(id:"69aefa3d00402a595603678c")
// # }


// # mutation{
// #   updateBook(input:{
// #     id: "69a86e38f8348c2b872d1fa3",
// #     title:"Js Ka",
// #     author:"Maha"
// #   }){
// #     _id, title, author
// #   }
// # }
@Resolver(() => Book)
export class BookResolver {
    constructor(private readonly bookService: BookService) { }

    // when ever we are retriving data we use "@Query" from the '@nestjs/graphql'
    @Query(() => [Book], { name: "getAllBooks" })
    async findAll() {
        return this.bookService.findAll()
    }
    @Query(() => Book, { name: "getBook" })
    async findOne(@Args('id', { type: () => String }) id: string) {
        return this.bookService.findOne(id)
    }

    @Mutation(() => Book)
    async createBook(@Args('input') input: CreateBookInput) {
        return this.bookService.createBook(input)
    }

    @Mutation(() => Book)
    async updateBook(@Args('input') input: UpdateBookInput) {
        return this.bookService.updateBook(input)
    }

    @Mutation(() => Boolean)
    async deleteBook(@Args('id', { type: () => String }) id: string) {
        return this.bookService.remove(id)
    }
}
