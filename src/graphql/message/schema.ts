import {  ArgsType, Field, ObjectType } from "type-graphql";
import { Matches} from "class-validator";
import {  regexUUID } from "../regex";

@ObjectType()
export class Message {
@Field()
@Matches(regexUUID)
  id!: string;
@Field()
@Matches(regexUUID)
  conversation_id!: string;
@Field()
  sender!: string;
@Field()
  content!: string;
}

@ArgsType()
export class MessageArgs{
@Field()
@Matches(regexUUID)
  id!: string;
}