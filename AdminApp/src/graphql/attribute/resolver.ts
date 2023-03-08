import { Args, Resolver, Query, Authorized } from 'type-graphql';
import {
  Attribute,
  AttributeArgs,
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
}