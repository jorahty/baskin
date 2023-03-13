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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [ChatMember])
    members!: ChatMember[];
}

@ObjectType()
export class ChatMember {
  @Field()
  @Matches(regexUsername)
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

@ArgsType()
export class NewChat {
  @Field()
  @Length(1, 32)
    name!: string;
}

@ArgsType()
export class ChatMemberArgs {
  @Field()
  @Matches(regexUsername)
    username!: string;
  @Field()
  @Matches(regexUUID)
    id!: string;
}

@ObjectType()
export class ChatStat {
  @Field()
    count!: number;
}
