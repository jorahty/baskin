import { Args, Resolver, Query, Authorized, Ctx, Mutation } from 'type-graphql';
import { NewProductArgs, Product, ProductArgs, FavoriteProductArgs, FavoriteProduct } from './schema';
import { ProductService } from './service';
import type { Request } from 'next';

@Resolver()
export class ProductResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Product])
  async product(@Args() args: ProductArgs): Promise<Product[]> {
    return new ProductService().list(args);
  }

  @Authorized('member')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Product)
  async create(@Args() args: NewProductArgs, @Ctx() request: Request): Promise<Product> {
    return new ProductService().create(args, request);
  }

  @Authorized('member')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [FavoriteProduct])
  async getFavorites(
    @Args() { product }: FavoriteProductArgs,
    @Ctx() request: Request
  ): Promise<FavoriteProduct[]> {
    return new ProductService().get(product, request);
  }

  @Authorized('member')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => FavoriteProduct)
  async favorite(
    @Args() { product }: FavoriteProductArgs,
    @Ctx() request: Request
  ): Promise<FavoriteProduct> {
    return new ProductService().favorite(product, request);
  }

  @Authorized('member')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => FavoriteProduct)
  async unfavorite(
    @Args() { product }: FavoriteProductArgs,
    @Ctx() request: Request
  ): Promise<FavoriteProduct> {
    return new ProductService().unfavorite(product, request);
  }
}
