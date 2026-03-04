import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Address {
    @Prop()
    street:string

    @Prop()
    city:string
}