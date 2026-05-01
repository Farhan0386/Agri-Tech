import { propertiesData } from '../data/mockData';

export const fetchPropertiesData = async (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredData = [...propertiesData];

      // Filtering
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredData = filteredData.filter(
          (p) =>
            p.title.toLowerCase().includes(searchLower) ||
            p.location.toLowerCase().includes(searchLower) ||
            p.type.toLowerCase().includes(searchLower)
        );
      }

      if (filters.propertyType && filters.propertyType !== 'All') {
        filteredData = filteredData.filter((p) => p.type === filters.propertyType);
      }

      if (filters.minPrice) {
        filteredData = filteredData.filter((p) => p.price >= parseInt(filters.minPrice));
      }

      if (filters.maxPrice) {
        filteredData = filteredData.filter((p) => p.price <= parseInt(filters.maxPrice));
      }
      
      if (filters.location) {
        const locLower = filters.location.toLowerCase();
        filteredData = filteredData.filter((p) => p.location.toLowerCase().includes(locLower));
      }

      // Sorting
      if (filters.sortBy === 'price-asc') {
        filteredData.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price-desc') {
        filteredData.sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === 'latest') {
        filteredData.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
      }

      // Pagination (Optional: can implement if needed. Let's return all for infinite scroll/pagination handling on frontend or just mock a subset)
      const page = filters.page || 1;
      const limit = filters.limit || 6;
      const start = (page - 1) * limit;
      const paginatedData = filteredData.slice(start, start + limit);

      resolve({
        data: paginatedData,
        total: filteredData.length,
        page,
        limit
      });
    }, 600); // Simulate network delay
  });
};

export const fetchPropertyById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const property = propertiesData.find((p) => p.id === parseInt(id));
      if (property) {
        resolve(property);
      } else {
        reject(new Error("Property not found"));
      }
    }, 400);
  });
};
