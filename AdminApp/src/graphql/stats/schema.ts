import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class StatPayload {
  @Field()
    user!: string;

  @Field()
    message!: string;

  @Field()
    chat!: string;

  @Field()
    product!: string;

  @Field()
    attribute!: string;

  @Field()
    category!: string;
}