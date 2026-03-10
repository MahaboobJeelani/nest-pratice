import { IsString, IsNotEmpty } from "class-validator";
import { Field, PartialType, InputType, ID } from "@nestjs/graphql";
import { CreateBookInput } from "./create-book.inputs";

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
    @Field(() => ID)
    @IsNotEmpty()
    id: string
}