import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden group">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {property.type}
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-red-500 transition-colors">
          <Heart size={18} />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <MapPin size={16} className="mr-1" />
          <span className="truncate">{property.location}</span>
        </div>
        
        <Link to={`/property/${property.id}`} className="block">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>
        
        <p className="text-2xl font-extrabold text-gradient mb-4">
          ${property.price.toLocaleString()}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border text-muted-foreground">
          <div className="flex items-center">
            <Bed size={18} className="mr-2" />
            <span className="text-sm font-medium">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath size={18} className="mr-2" />
            <span className="text-sm font-medium">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Square size={18} className="mr-2" />
            <span className="text-sm font-medium">{property.area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
