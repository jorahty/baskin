import { Field, ObjectType, ArgsType } from "type-graphql"
import { Length, Matches } from "class-validator";
import { regexEmail, regexUsername } from "../regex";

@ArgsType()
export class Credentials {
  @Field()
  @Matches(regexUsername)
    username!: string

  @Field()
  @Length(8, 16)
    password!: string
}

@ObjectType()
export class SignInPayload {
  @Field()
  @Matches(regexUsername)
    username!: string

  @Field()
    accessToken!: string
  
  @Field()
  @Length(1, 32)
    name!: string
}

@ObjectType()
export class UserCheck {
  @Field()
    name!: string
  @Field()
  @Matches(regexEmail)
    email!: string
  @Field()
  @Matches(regexUsername)
    username!: string
}