import { Field, ObjectType, ArgsType, InputType } from "type-graphql"
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
    username!: string

  @Field()
    accessToken!: string
}

@ObjectType()
export class SignUpPayload {
  @Field()
    username!: string

  @Field()
    name!: string
    
  @Field()
    email!: string
}

@ObjectType()
@InputType("UserInput")
export class NewUser {
  @Field()
  @Matches(regexEmail)
    email!: string

  @Field()
    name!: string
  
  @Field()
  @Matches(regexUsername)
    username!: string
  
  @Field()
  @Length(8, 16)
    password!: string
}
