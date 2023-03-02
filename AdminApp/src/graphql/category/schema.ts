import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Category {
  @Field()
    slug!: string;
  @Field()
    name!: string;
}
