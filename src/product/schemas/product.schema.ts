import { Schema, Prop, MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { Document, mongo } from "mongoose";
import { TagSchema } from "./tag.schema";

@Schema()
export class Product extends TagSchema{
     @Prop()
     title:string

     @Prop({type: [TagSchema]})
     tags: TagSchema[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)