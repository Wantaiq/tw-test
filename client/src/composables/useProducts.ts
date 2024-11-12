import api from '@/utils/api';
import { useQuery } from '@tanstack/vue-query';

export type ProductType = {
  id: number;
  description: string;
  thumbnail: string;
  title: string;
  price: number;
  availabilityStatus: string;
};
type ProductResponseType = { products: ProductType[] };

const useProducts = () => {
  const queryAll = useQuery({
    retry: false,
    queryKey: ['products'],
    queryFn: async () => {
      return await api.get<ProductResponseType>('/products');
    },
    select: response => response.data.products,
  });

  return queryAll;
};

export default useProducts;
