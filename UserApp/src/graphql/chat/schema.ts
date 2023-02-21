import { ArgsType, Field, ObjectType } from 'type-graphql';
import { regexUsername, regexUUID } from '../regex';
import { Matches, Length } from 'class-validator';

@ObjectType()
export class Chat {
  @Field()
  @Matches(regexUUID)
    id!: string;

  @Field({ nullable: true })
  @Length(1, 32)
    name?: string;

  // eslint-disable-line @typescript-eslint/no-unused-vars
  @Field(type => [ChatMember])
    members!: ChatMember[];
}

@ObjectType()
class ChatMember {
  @Field()
  name!: string;
  
  @Field()
  username!: string;
}

@ArgsType()
export class ChatArgs {
  @Field({ nullable: true })
  @Matches(regexUsername)
    username!: string;
  @Field({ nullable: true })
  @Matches(regexUUID)
    id?: string;
}
