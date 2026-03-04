

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Address } from "./address.schema";

@Schema()
export class User extends Address {
    @Prop()
    name: string

    @Prop({ type: Address })
    address: Address
}

export const UserSchema = SchemaFactory.createForClass(User)