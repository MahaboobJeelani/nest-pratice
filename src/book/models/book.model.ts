import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
@ObjectType()
export class Book extends Document {
    @Field(() => ID)
    // MongoDB automatically creates a default "_id" field for every document.
    // Since Mongoose's Document already defines this property internally,
    // TypeScript may throw an error about duplicate or conflicting declarations.
    // To avoid that, we use the "declare" keyword to tell TypeScript that the
    // property already exists and will be provided at runtime by Mongoose.
    // The "readonly" keyword ensures that the "_id" cannot be modified manually.
    declare readonly _id: Types.ObjectId;

    @Prop({ required: true })
    @Field()
    title: string

    @Prop()
    @Field({ nullable: true })
    description?: string

    @Prop({ required: true })
    @Field()
    author: string
}

export const BookSchema = SchemaFactory.createForClass(Book)
