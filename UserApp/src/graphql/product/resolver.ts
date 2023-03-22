import { Arg, Args, Resolver, Query, Authorized, Ctx, Mutation } from 'type-graphql';
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
  async addProduct(
    @Arg('product') product: NewProductArgs,
    @Ctx() { user: { username } }: Request,
  ): Promise<Product> {
    const input = { user: username, discount: 0, ...product };
    return new ProductService().add(input);
  }

  @Authorized('member')
  @Mutation(() => Product)
  async updateProduct(
    @Arg('id') id: string,
    @Arg('input') product: NewProductArgs,
    @Ctx() request: Request,
  ): Promise<Product> {
    const { username } = request.user;
    console.log(username);
    const input = { user: username, discount: 0, ...product };
    return new ProductService().update(id, input, request);
  }

  @Authorized('member')
  @Mutation(() => Product)
  async removeProduct(
    @Args() { product }: SingleProductArgs,
    @Ctx() request: Request,
  ): Promise<Product> {
    return new ProductService().remove(product, request);
  }
}
