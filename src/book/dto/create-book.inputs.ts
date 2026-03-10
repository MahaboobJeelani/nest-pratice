import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, isString, IsString } from 'class-validator'

@InputType()
export class CreateBookInput{
    @Field()
    @IsString()
    @IsNotEmpty()
    title:string

    @Field({nullable:true})
    @IsString()
    @IsOptional()
    description?:string

    @Field()
    @IsString()
    @IsNotEmpty()
    author:string

}