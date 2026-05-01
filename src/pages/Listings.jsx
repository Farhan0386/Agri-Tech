import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties, setPage } from '../store/propertiesSlice';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';

const Listings = () => {
  const dispatch = useDispatch();
  const { items, status, filters, sortBy, totalItems, page } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties({ ...filters, sortBy, page }));
  }, [dispatch, filters, sortBy, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4 text-gradient inline-block">Properties for Sale</h1>
        <p className="text-muted-foreground">Find the best properties that fit your lifestyle.</p>
      </div>

      <PropertyFilters />

      {status === 'loading' && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {status === 'failed' && (
        <div className="text-center py-20 text-red-500">
          Failed to load properties. Please try again.
        </div>
      )}

      {status === 'succeeded' && items.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-2xl font-semibold mb-2">No properties found</p>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}

      {status === 'succeeded' && items.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {items.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Simple Pagination / Load More Simulator */}
          {totalItems > items.length && (
            <div className="flex justify-center mt-12">
              <button 
                onClick={() => dispatch(setPage(page + 1))}
                className="px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-full hover:bg-primary hover:text-white transition-colors border border-border"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Listings;
