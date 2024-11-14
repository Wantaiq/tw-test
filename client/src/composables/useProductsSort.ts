import type { ProductType } from './useProductsApi';

const useProductsSort = () => {
  const sortByPrice = (products: ProductType[], ascending = false) => {
    if (ascending) {
      return [...products].sort((a, b) => a.price - b.price);
    }

    return [...products].sort((a, b) => b.price - a.price);
  };

  return { sortByPrice };
};

export default useProductsSort;
