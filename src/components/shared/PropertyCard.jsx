import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { MapPin, Bed, Bath, Square, Heart, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PropertyCard({
  id,
  title,
  address,
  locality,
  rent,
  deposit,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  propertyType,
  eligibility = [],
  status,
  isFavorite = false,
  onView,
  onFavorite,
  onApply,
  variant = 'tenant',
  className,
}) {
  return (
    <Card
      variant="interactive"
      className={cn('overflow-hidden group', className)}
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge variant="default" className="bg-card/90 text-foreground backdrop-blur-sm">
            {propertyType}
          </Badge>
          {eligibility.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="info" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Status badge for landlord view */}
        {status && variant === 'landlord' && (
          <div className="absolute top-3 right-3">
            <StatusBadge status={status} />
          </div>
        )}

        {/* Favorite button for tenant view */}
        {variant === 'tenant' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.();
            }}
            className={cn(
              'absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm transition-all hover:scale-110',
              isFavorite ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
          </button>
        )}

        {/* Price tag */}
        <div className="absolute bottom-3 left-3 rounded-lg bg-gradient-hero px-3 py-1.5 shadow-lg">
          <p className="text-lg font-bold text-primary-foreground">
            ₹{rent.toLocaleString()}
            <span className="text-xs font-normal opacity-80">/month</span>
          </p>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{locality}, {address}</span>
        </div>

        {/* Property specs */}
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Bed className="h-4 w-4" />
            <span>{bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Bath className="h-4 w-4" />
            <span>{bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Square className="h-4 w-4" />
            <span>{area} sqft</span>
          </div>
        </div>

        {/* Deposit info */}
        <p className="mt-3 text-xs text-muted-foreground">
          Security Deposit: <span className="font-medium text-foreground">₹{deposit.toLocaleString()}</span>
        </p>
      </CardContent>

      {/* Footer with actions */}
      <CardFooter className="p-4 pt-0 gap-2">
        <Button
          variant="govOutline"
          size="sm"
          className="flex-1"
          onClick={onView}
        >
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </Button>
        {variant === 'tenant' && (
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={onApply}
          >
            Apply Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
