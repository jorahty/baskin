import { ArgsType, Field, InputType, ObjectType } from 'type-graphql';
import { Matches, Length, MinLength } from 'class-validator';
import { regexISODate, regexSlug, regexUsername, regexUUID } from '../regex';

@ObjectType()
export class Product {
  @Field()
  @Matches(regexUUID)
    id!: string;
  @Field()
  @Matches(regexUsername)
    user!: string;
  @Field()
  @Matches(regexSlug)
    category!: string;
  @Field()
  @Length(1, 32)
    name!: string;
  @Field()
    price!: number;
  @Field()
    discount!: number;
  @Field()
    quantity!: number;
  @Field()
  @Length(1, 1024)
    description!: string;
  @Field()
  @Matches(regexISODate)
    date!: string;
  @Field(() => [String])
  @MinLength(1)
    pictures!: string[];
}

@ArgsType()
export class ProductArgs {
  @Field({ nullable: true })
  @Matches(regexUUID)
    id?: string;
  @Field({ nullable: true })
    user?: string;
  @Field({ nullable: true })
    category?: string;
}

@ObjectType()
@InputType('ProductInput')
export class NewProduct {
  @Field()
  @Matches(regexUsername)
    user!: string;
  @Field()
  @Matches(regexSlug)
    category!: string;
  @Field()
  @Length(1, 32)
    name!: string;
  @Field()
    price!: number;
  @Field()
    quantity!: number;
  @Field()
  @Length(1, 1024)
    description!: string;
  @Field(() => [String])
    pictures!: string[];
}

@ArgsType()
export class RemoveProductArgs {
  @Field()
  @Matches(regexUUID)
    id!: string;
}
