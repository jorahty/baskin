import { Field, ObjectType, ArgsType } from "type-graphql"
import { Length, Matches } from "class-validator";
import { regexEmail } from "../regex";

@ArgsType()
export class Credentials {
  @Field()
  @Matches(regexEmail)
    email!: string

  @Field()
  @Length(8, 16)
    password!: string
}

@ObjectType()
export class SignInPayload {
  @Field()
    username!: string

  @Field()
    accessToken!: string
}

