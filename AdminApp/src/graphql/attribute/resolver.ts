import { Arg, Args, Resolver, Query, Authorized, Mutation } from 'type-graphql';
import {
  Attribute,
  AttributeArgs,
  RemoveAttributeArgs,
  NewAttribute,
  EditAttribute,
} from './schema';
import { AttributeService } from './service';


@Resolver()
export class AttributeResolver {
  @Authorized()
  @Query(() => [Attribute])
  async attribute(
    @Args() { id }: AttributeArgs
  ): Promise<Attribute[]> {
    return new AttributeService().list(id);
  }

  @Authorized()
  @Mutation(() => Attribute)
  async addAttribute(
    @Arg('input') input: NewAttribute,
  ): Promise<Attribute> {
    return new AttributeService().add(input);
  }

  @Mutation(() => Attribute)
  async editAttribute(
    @Arg('input') input: EditAttribute,
  ): Promise<Attribute> {
    return new AttributeService().edit(input);
  }

  @Authorized()
  @Mutation(() => Attribute)
  async removeAttribute(
    @Args() { id }: RemoveAttributeArgs
  ): Promise<Attribute> {
    return new AttributeService().remove(id);
  }
}