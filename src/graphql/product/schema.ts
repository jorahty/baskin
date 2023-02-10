import { Field, ObjectType } from "type-graphql";
import { Matches } from "class-validator";

const UUIDFormat =
  /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}/;

@ObjectType()
export class Product {
  @Field()
  @Matches(UUIDFormat)
    id!: string;
  @Field()
  @Matches(UUIDFormat)
    mid!: string;
  @Field()
  @Matches(UUIDFormat)
    cid!: string;
  @Field()
    title!: string;
  @Field()
    quantity!: number;
  @Field()
    price!: number;
  @Field()
    description!: string;
  @Field()
    date!: string;
}
