import { ArgsType, Field, ObjectType, InputType } from 'type-graphql';
import { Matches } from 'class-validator';
import { regexUUID, regexUsername, regexISODate } from '../regex';

@ObjectType()
export class Message {
  @Field()
  @Matches(regexUUID)
    id!: string;
  @Field()
  @Matches(regexUUID)
    chat_id!: string;
  @Field()
  @Matches(regexUsername)
    sender!: string;
  @Field()
    content!: string;
  @Field()
  @Matches(regexISODate)
    date!: string;
}

@ArgsType()
export class MessageArgs {
  @Field()
  @Matches(regexUUID)
    id!: string;
}

@ObjectType()
@InputType('MessageInput')
export class NewMessage {
  @Field()
  @Matches(regexUUID)
    chat_id!: string;
  @Field()
    content!: string;
}
