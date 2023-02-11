import { ArgsType, Field, ObjectType } from "type-graphql";
import { Matches, Length } from "class-validator";
import { regexISODate, regexSlug, regexUsername, regexUUID } from "../regex";

@ObjectType()
export class Product {
  @Field()
  @Matches(regexUUID)
    id!: string;

  @Field()
  @Matches(regexUsername)
    owner_username!: string;

  @Field()
  @Matches(regexSlug)
    product_category!: string;

  @Field()
  @Length(1, 32)
    title!: string;

  @Field()
    price!: number;

  @Field()
    quantity!: number;

  @Field()
  @Length(1, 1024)
    description!: string;

  @Field()
  @Matches(regexISODate)
    date!: string;
}

@ArgsType()
export class ProductArgs {
  @Field({ nullable: true })
  @Matches(regexUUID)
    id?: string;

  @Field({ nullable: true })
    owner_username?: string;

  @Field({ nullable: true })
    product_category?: string;
}
