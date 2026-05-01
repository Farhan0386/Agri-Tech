import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPropertyById } from '../api/mockApi';
import { Bed, Bath, Square, MapPin, Calendar, Check, ArrowLeft, Heart, Share2 } from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        const data = await fetchPropertyById(id);
        setProperty(data);
        setActiveImage(data.imageUrl);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Property Not Found</h2>
        <p className="text-muted-foreground mb-6">The property you are looking for does not exist or has been removed.</p>
        <Link to="/listings" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen animate-fade-in-up">
      <Link to="/listings" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        Back to properties
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full">
              {property.type}
            </span>
            <span className="flex items-center text-muted-foreground text-sm">
              <Calendar size={14} className="mr-1" />
              Listed on {new Date(property.addedAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{property.title}</h1>
          <p className="text-xl text-muted-foreground flex items-center">
            <MapPin size={20} className="mr-2" />
            {property.location}
          </p>
        </div>
        
        <div className="flex flex-col items-start lg:items-end">
          <p className="text-4xl font-extrabold text-gradient mb-4">
            ${property.price.toLocaleString()}
          </p>
          <div className="flex gap-3">
            <button className="p-3 bg-secondary rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors">
              <Heart size={24} />
            </button>
            <button className="p-3 bg-secondary rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-colors">
              <Share2 size={24} />
            </button>
            <button className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg">
              Contact Agent
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden glass shadow-xl">
            <img src={activeImage} alt={property.title} className="w-full h-full object-cover transition-opacity duration-500" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {property.images && property.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`flex-shrink-0 w-32 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Property Overview</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mr-4">
                  <Bed size={24} />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Bedrooms</p>
                  <p className="font-bold text-lg">{property.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mr-4">
                  <Bath size={24} />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Bathrooms</p>
                  <p className="font-bold text-lg">{property.bathrooms}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mr-4">
                  <Square size={24} />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Square Feet</p>
                  <p className="font-bold text-lg">{property.area}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {property.description}
            </p>
          </div>
          
          <div className="glass p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Features & Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {property.features && property.features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-muted-foreground">
                  <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
