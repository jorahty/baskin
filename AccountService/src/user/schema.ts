import { ArgsType, Field, ObjectType, InputType } from 'type-graphql';
import { Length, Matches } from 'class-validator';

import { regexUsername, regexEmail } from '../regex';

@ObjectType()
export class User {
  @Field()
  @Matches(regexUsername)
    username!: string;
  @Field()
    name!: string;
  @Field()
  @Matches(regexEmail)
    email!: string;
  @Field()
    password!: string;
  @Field(() => [String])
    roles!: string[];
}

@ArgsType()
export class UserArgs {
  @Field({ nullable: true })
  @Matches(regexUsername)
    username!: string;
  @Field({ nullable: true })
  @Matches(regexEmail)
    email!: string;
}

@ObjectType()
@InputType('UpdateRolesInput')
export class UpdateRoles {
  @Field()
  @Matches(regexUsername)
    username!: string;
  @Field(() => [String])
    roles!: string[];
}


@ObjectType()
export class SignUpPayload {
  @Field()
  @Matches(regexUsername)
    username!: string;

  @Field()
  @Length(1, 32)
    name!: string;

  @Field()
  @Matches(regexEmail)
    email!: string;
}

@ObjectType()
@InputType('UserInput')
export class NewUser {
  @Field()
  @Matches(regexEmail)
    email!: string;

  @Field()
  @Length(1, 32)
    name!: string;

  @Field()
  @Matches(regexUsername)
    username!: string;

  @Field()
  @Length(8, 16)
    password!: string;
}
