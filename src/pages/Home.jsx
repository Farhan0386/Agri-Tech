import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProperties } from '../store/propertiesSlice';
import PropertyCard from '../components/PropertyCard';
import { ArrowRight, Home as HomeIcon, MapPin, Key } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.properties);

  useEffect(() => {
    // Fetch top 3 properties for home page
    dispatch(fetchProperties({ limit: 3 }));
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Home" 
            className="w-full h-full object-cover filter brightness-[0.4] dark:brightness-[0.3]"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight animate-fade-in-up">
            Find Your Dream <span className="text-primary">Home</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover the most exclusive properties in the most desirable locations across the country.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/listings" className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-lg flex items-center">
              Explore Listings
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LuxEstate?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We provide a seamless and premium experience for finding your perfect property.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HomeIcon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Properties</h3>
              <p className="text-muted-foreground">Access to the most exclusive and luxurious properties on the market.</p>
            </div>
            <div className="glass p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Prime Locations</h3>
              <p className="text-muted-foreground">Properties located in the most sought-after neighborhoods and cities.</p>
            </div>
            <div className="glass p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Key size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Transactions</h3>
              <p className="text-muted-foreground">Safe, transparent, and seamless buying or renting process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
              <p className="text-muted-foreground">Handpicked properties that stand out from the rest.</p>
            </div>
            <Link to="/listings" className="hidden sm:flex items-center text-primary font-medium hover:underline">
              View All <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>

          {status === 'loading' && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {status === 'succeeded' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center sm:hidden">
            <Link to="/listings" className="inline-flex items-center text-primary font-medium hover:underline">
              View All Properties <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
