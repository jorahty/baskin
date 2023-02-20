import { ArgsType, Field, ObjectType } from 'type-graphql';
import { regexUsername, regexUUID } from '../regex';
import { Matches } from 'class-validator';

@ObjectType()
export class Chat {
  @Field()
  @Matches(regexUUID)
    id!: string;
}

@ArgsType()
export class ChatArgs {
  @Field({ nullable: true })
  @Matches(regexUsername)
    username!: string;
  @Field({ nullable: true })
  @Matches(regexUUID)
    id!: string;
}
