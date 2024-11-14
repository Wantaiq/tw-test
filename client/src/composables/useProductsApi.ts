import api from '@/utils/api';
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query';

export type ProductType = {
  id: number;
  description: string;
  thumbnail: string;
  title: string;
  price: number;
  availabilityStatus: string;
};
type ProductResponseType = { products: ProductType[] };
type InifiniteQueryResponseType = { products: ProductType[]; total: number };

const ITEMS_PER_PAGE = 10;

const useProductsApi = () => {
  const queryAll = () =>
    useQuery({
      retry: false,
      queryKey: ['products'],
      queryFn: async () => {
        return await api.get<ProductResponseType>('/products');
      },
      select: response => response.data.products,
    });

  const fetchMoreItems = async ({ pageParam = 0 }) => {
    const response = await api.get<InifiniteQueryResponseType>(
      `/products?limit=${ITEMS_PER_PAGE}&skip=${pageParam}`,
    );

    return response.data;
  };

  let queryCacheKey = 0;

  const loadMoreQuery = () =>
    useInfiniteQuery({
      queryKey: ['productsList', queryCacheKey],
      queryFn: fetchMoreItems,
      initialPageParam: 0,
      retry: false,
      getNextPageParam: (_lastPage, pages) => {
        queryCacheKey += 1;
        const nextSkip = pages.length * ITEMS_PER_PAGE;
        const totalItems = pages[0].total || 100;
        if (nextSkip < totalItems) {
          return nextSkip;
        }

        return undefined;
      },
    });

  return { queryAll, loadMoreQuery };
};

export default useProductsApi;
