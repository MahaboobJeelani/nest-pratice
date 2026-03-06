/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    // ONE TO MANY RELATION in Embeded modeling using mongoDB

    @Post()
    async createProduct() {
        return this.productService.createProduct()
    }

    @Get("getAllProducts")
    async getAllProduct() {
        return this.productService.getProducts()
    }


    @Get()
    // UseGuards is used for the authentication and authoraization the routes
    @UseGuards(AuthGuard)
    getProducts() {
        return this.productService.getAllProducts();
    }
    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productService.getProductById(Number(id))
    }
}