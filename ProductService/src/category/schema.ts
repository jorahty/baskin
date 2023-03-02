import { ArgsType, Field, ObjectType, InputType } from 'type-graphql';
import { Matches, Length } from 'class-validator';
import { regexSlug } from '../regex';

@ObjectType()
export class Category {
  @Field()
  @Matches(regexSlug)
    slug!: string;
  @Field()
  @Length(1, 32)
    name!: string;
  @Field({ nullable: true })
  @Matches(regexSlug)
    parent?: string;
}

@ArgsType()
export class CategoryArgs {
  @Field({ nullable: true })
  @Matches(regexSlug)
    slug?: string;
}

@ArgsType()
export class CategoryChildrenArgs {
  @Field({ nullable: true })
  @Matches(regexSlug)
    slug?: string;
}

@ArgsType()
export class CategoryAncestorsArgs {
  @Field()
  @Matches(regexSlug)
    slug!: string;
}

@ObjectType()
@InputType('CategoryInput')
export class NewCategory {
  @Field()
  @Length(1, 32)
    name!: string;
  @Field()
  @Matches(regexSlug)
    slug!: string;
  @Field({ nullable: true })
  @Matches(regexSlug)
    parent?: string;
}
