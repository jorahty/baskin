import { ArgsType, Field, ObjectType, InputType } from 'type-graphql';
import { Matches, Length, MinLength } from 'class-validator';
import { regexSlug, regexUUID } from '../regex';

@ObjectType()
export class Attribute {
  @Field()
  @Length(10)
    id!: string;
  @Field()
  @Matches(regexSlug)
    category!: string;
  @Field()
  @Length(1, 32)
    name!: string;
  @Field()
  @Length(1, 32)
    type!: string;
  @Field({ nullable: true })
    min?: number;
  @Field({ nullable: true })
    max?: number;
  @Field({ nullable: true })
    step?: number;
  @Field({ nullable: true })
  @Length(1, 8)
    symbol?: string;
  @Field(() => [String], { nullable: true })
  @MinLength(1)
    values?: string[];
}

@ArgsType()
export class AttributeArgs {
  @Field({ nullable: true })
  @Length(10)
    id?: string;
}

@ArgsType()
export class RemoveAttributeArgs {
  @Field()
  @Length(10)
    id!: string;
}

@ObjectType()
@InputType('AttributeInput')
export class NewAttribute {
  @Field()
    category!: string;
  @Field()
  @Length(1, 32)
    name!: string;
  @Field()
  @Length(1, 32)
    type!: string;
  @Field({ nullable: true })
    min?: number;
  @Field({ nullable: true })
    max?: number;
  @Field({ nullable: true })
    step?: number;
  @Field({ nullable: true })
  @Length(1, 8)
    symbol?: string;
  @Field(() => [String], { nullable: true })
    values?: string[];
}

@ObjectType()
@InputType('EditAttributeInput')
export class EditAttribute {
  @Field()
  @Length(10)
    id!: string;
  @Field({ nullable: true })
    category!: string;
  @Field({ nullable: true })
  @Length(1, 32)
    name!: string;
  @Field({ nullable: true })
  @Length(1, 32)
    type!: string;
  @Field({ nullable: true })
    min?: number;
  @Field({ nullable: true })
    max?: number;
  @Field({ nullable: true })
    step?: number;
  @Field({ nullable: true })
  @Length(1, 8)
    symbol?: string;
  @Field(() => [String], { nullable: true })
    values?: string[];
}
