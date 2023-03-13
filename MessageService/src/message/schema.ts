import { ArgsType, Field, InputType, ObjectType } from 'type-graphql';
import { Matches } from 'class-validator';
import { regexUsername, regexUUID } from '../regex';

@ObjectType()
export class Message {
  @Field()
  @Matches(regexUUID)
    id!: string;
  @Field()
  @Matches(regexUUID)
    chat_id!: string;
  @Field()
    sender!: string;
  @Field()
    content!: string;
  @Field()
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
  @Matches(regexUsername)
    sender!: string;
  @Field()
    content!: string;
}

@ObjectType()
export class MessageStat {
  @Field()
    count!: number;
}
