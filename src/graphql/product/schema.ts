import { ArgsType, Field, ObjectType } from "type-graphql";
import { Matches } from "class-validator";

const UUIDFormat =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

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
    price!: number;
  @Field()
    quantity!: number;
  @Field()
    description!: string;
  @Field()
    date!: string;
}

@ArgsType()
export class ProductArgs {
  @Field({ nullable: true })
  @Matches(UUIDFormat)
    id?: string;
  @Field({ nullable: true })
  @Matches(UUIDFormat)
    mid?: string;
  @Field({ nullable: true })
  @Matches(UUIDFormat)
    cid?: string;
}
