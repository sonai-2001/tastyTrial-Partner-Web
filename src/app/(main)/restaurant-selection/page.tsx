'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { 
  ArrowRight, 
  PlusCircle, 
  User, 
  ClipboardList 
} from "lucide-react"
import Link from "next/link"
import { useGetAllRestaurants } from '@/api/hooks/restaurant-selector/hooks'
import { useAuth } from '@/hooks/useAuth'
import { restaurantSelectorSchema } from '@/api/hooks/restaurant-selector/schema'
import { toast } from 'sonner'

const MOCK_STATIONS = [
  {
    id: "1",
    name: "The Prime Cut",
    description: "STEAKHOUSE & GRILL",
    manager: "A. Smith",
    chits: 14,
    variant: "primary"
  },
  {
    id: "2",
    name: "Osteria Bella",
    description: "ITALIAN FINE DINING",
    manager: "M. Rossi",
    chits: 8,
    variant: "ghost"
  },
  {
    id: "3",
    name: "Harbor Seafood",
    description: "COASTAL CATCH & RAW BAR",
    manager: "L. Chen",
    chits: 22,
    variant: "ghost"
  }
]

export default function RestaurantSelectionPage() {
    const {data:MyRestaurantsData, isLoading:MyRestaurantsLoading} = useGetAllRestaurants()
    const {setActiveRestaurant}=useAuth()

    const handleRestaurantsClick= (restaurant:restaurantSelectorSchema['singleRes'])=>{
      if(!restaurant._id || !restaurant.name){
        toast.error("Invalid restaurant")
        return
      }
      setActiveRestaurant({
        _id: restaurant._id,
        name: restaurant.name
      })

    }
    console.log('my all res are this ', MyRestaurantsData)
    const MyRestaurants=MyRestaurantsData?.data || []

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-white overflow-hidden">
      {/* LEFT PANEL: Editorial Branding */}
      <section className="relative hidden lg:flex flex-1 items-start p-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110"
          style={{ backgroundImage: 'url("/assets/culinary-ledger-hero.png")' }}
        />
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Content */}
        <div className="relative z-10 space-y-2">
          <Typography 
            variant="h1" 
            className="text-primary text-6xl font-display font-black leading-[0.9] tracking-tighter drop-shadow-sm"
          >
            The <br /> Tasty-Trial <br />Station 
          </Typography>
        </div>

        {/* Bottom Glass Box */}
        <div className="absolute bottom-12 left-12 right-12 bg-white/40 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/30 shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <Typography variant="body1" className="text-foreground font-bold leading-relaxed max-w-sm">
            Operational precision for establishments of consequence. Select your station to begin service.
          </Typography>
        </div>
      </section>

      {/* RIGHT PANEL: Tactical Access */}
      <section className="flex-1 bg-surface flex flex-col p-8 md:p-16 lg:p-24 overflow-y-auto">
        <div className="max-w-md mx-auto w-full space-y-12">
          <header className="space-y-2">
            <Typography variant="h2" className="text-3xl font-display font-black text-foreground">
              Active Stations
            </Typography>
          </header>

          <div className="space-y-6">
            {MyRestaurants.map((station) => (
              <div 
                key={station._id}
                className="group bg-surface-lowest p-8 rounded-3xl shadow-ambient hover:shadow-xl transition-all duration-500 border border-transparent hover:border-primary/5 cursor-pointer"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <Typography variant="h4" className="text-xl font-display font-black leading-none group-hover:text-primary transition-colors">
                      {station.name}
                    </Typography>
                    <Typography variant="small" className="text-[10px] font-black text-secondary/40 tracking-[0.2em] uppercase">
                      {station.serviceType}
                    </Typography>
                  </div>
                  
                  <Link href={`/dashboard`}>
                    <Button 
                      variant='default'
                      className={`h-11 px-6 rounded-xl font-bold tracking-tight shadow-sm group/btn
                        ${station.isActive ? 'bg-primary' : 'bg-[#e2efff] text-foreground hover:bg-[#d4e6ff]'}`}
                      onClick={()=>{
                        handleRestaurantsClick(station)
                      }}  
                    >
                      Access Station <ArrowRight className="ml-2 size-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center gap-6 mt-8 pt-6 border-t border-secondary/5">
                  <div className="flex items-center gap-2 text-secondary/40">
                    <User className="size-4" />
                    <Typography variant="small" className="font-bold tracking-tight">
                      {/* Mgr: {station.} */}
                      {station.isActive ? 'Active' : 'Inactive'}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2 text-secondary/40">
                    <ClipboardList className="size-4" />
                    <Typography variant="small" className="font-bold tracking-tight">
                      {station.cuisines.length} Cuisines
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer: Action Link */}
            <Link 
              href="/onBoarding/register-restaurant" 
              className="flex items-center gap-4 text-primary font-bold transition-all group"
            >
              <div className="size-8 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <PlusCircle className="size-5 text-white fill-white stroke-[3]" />
              </div>
              <Typography variant="body1" className="tracking-tight text-lg">
                Register New Establishment
              </Typography>
            </Link>
        </div>
      </section>
    </div>
  )
}