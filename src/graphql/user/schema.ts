import { ArgsType, Field, ObjectType } from "type-graphql";
import { Matches } from 'class-validator';

import { regexUsername } from "../regex";

@ObjectType()
export class User {
  @Field()
  @Matches(regexUsername)
    username!: string;
  @Field()
    name!: string;
  @Field()
    email!: string;
}

@ArgsType()
export class UserArgs {
  @Field({ nullable: true })
  @Matches(regexUsername)
    username!: string;
}
