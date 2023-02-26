import { Args, Resolver, Query, Authorized, Ctx, Mutation } from 'type-graphql';
import { NewProductArgs, Product, ProductArgs, SingleProductArgs } from './schema';
import { ProductService } from './service';
import type { Request } from 'next';

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async product(
    @Args() args: ProductArgs,
  ): Promise<Product[]> {
    return new ProductService().list(args);
  }

  @Authorized('member')
  @Mutation(() => Product)
  async create(
    @Args() args: NewProductArgs,
    @Ctx() request: Request,
  ): Promise<Product> {
    return new ProductService().add(args, request);
  }

  @Authorized('member')
  @Mutation(() => Product)
  async delete(
    @Args() { product }: SingleProductArgs,
    @Ctx() request: Request,
  ): Promise<Product> {
    return new ProductService().remove(product, request);
  }
}
