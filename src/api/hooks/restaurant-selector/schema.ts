import { TCommonSchema } from "@/types/common/common.schema";

export type ServiceType = 'delivery_dining' | 'delivery_only' | 'dining_only';

export type restaurantSelectorSchema = {
  cuisine: {
    _id: string;
    name: string;
    description?: string;
    image?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  availability: {
    _id: string;
    day: string;
    openTime?: string;
    closeTime?: string;
    isOpen: boolean;
  };

  singleRes: {
    _id: string;
    owner: string;

    name: string;
    serviceType: ServiceType;

    address: string;
    city: string;
    pincode: string;

    cuisines: restaurantSelectorSchema['cuisine'][]; // populated

    images: string[];

    availability: restaurantSelectorSchema['availability'][];

    rating: number;
    isActive: boolean;

    createdAt: string;
    updatedAt: string;

    __v: number;
  };
  getAllRes:{
    data:restaurantSelectorSchema['singleRes'][];
    meta:TCommonSchema['BaseMetaResponse']
    
  }

};
