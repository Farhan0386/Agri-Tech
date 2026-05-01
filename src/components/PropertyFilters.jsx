import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, setSortBy } from '../store/propertiesSlice';
import { useDebounce } from '../utils/useDebounce';
import { Search, MapPin, DollarSign, Filter, ArrowUpDown } from 'lucide-react';

const PropertyFilters = () => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state) => state.properties.filters);
  const currentSortBy = useSelector((state) => state.properties.sortBy);
  
  // Local state for debounced inputs
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(setFilters({ search: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div className="glass rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-4 items-center animate-fade-in-up">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search by title, location, type..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap md:flex-nowrap gap-4 w-full md:w-auto">
        <div className="relative w-full md:w-48">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <select
            name="propertyType"
            value={currentFilters.propertyType || 'All'}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-8 py-3 rounded-xl border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>

        <div className="relative w-full md:w-48">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <select
            name="maxPrice"
            value={currentFilters.maxPrice || ''}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-8 py-3 rounded-xl border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="">Any Price</option>
            <option value="500000">Up to $500k</option>
            <option value="1000000">Up to $1M</option>
            <option value="2000000">Up to $2M</option>
            <option value="5000000">Up to $5M</option>
          </select>
        </div>

        <div className="relative w-full md:w-48">
          <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <select
            value={currentSortBy}
            onChange={handleSortChange}
            className="w-full pl-10 pr-8 py-3 rounded-xl border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="latest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
