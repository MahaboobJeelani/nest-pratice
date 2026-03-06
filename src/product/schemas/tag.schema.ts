import { Schema, Prop } from "@nestjs/mongoose";

@Schema()
export class TagSchema{
    @Prop()
    name:string
}