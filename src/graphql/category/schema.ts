import { ArgsType, Field, ObjectType } from "type-graphql";

@ObjectType()
export class Category {
  @Field()
    slug!: string;
  @Field()
    name!: string;
}

@ArgsType()
export class CategoryArgs {
  @Field({ nullable: true })
    slug?: string;
}
