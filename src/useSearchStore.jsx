import create from 'zustand';

const useSearchStore = create((set) => ({
  query: '',
  products: [], // Initial list of products
  filteredProducts: [],
  setQuery: (query) => set((state) => {
    const filteredProducts = state.products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    return { query, filteredProducts };
  }),
  setProducts: (products) => set({ products, filteredProducts: products }),
}));

export default useSearchStore;
