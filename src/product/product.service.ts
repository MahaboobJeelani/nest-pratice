/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    private products = [
        { id: 1, name: "Mobile", price: 20000 },
        { id: 2, name: "Tablet", price: 40000 },
        { id: 3, name: "Laptop", price: 80000 },
    ];
    getAllProducts() {
        return this.products;
    }
    getProductById(id: number) {
        return this.products.find((product) => product.id === id)
    }



    

    // ONE TO MANY RELATIONSHIP IN EMBEDED MODELING using mongoDB
    async createProduct(): Promise<Product> {
        const newProduct = new this.productModel({
            title: "Gaming Laptop",
            tags: [
                { name: "electrnic" },
                { name: "gaming" },
                { name: "Laptop" }
            ]
        })
        return newProduct.save()
    }

    async getProducts():Promise<Product[]>{
        return this.productModel.find().exec()
    }
}