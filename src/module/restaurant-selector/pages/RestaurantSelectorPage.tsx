'use client'
import { Badge } from "@/components/ui/badge"
import { ShoppingBasket, ArrowRight, Plus } from "lucide-react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function RestaurantSelector() {
  const [filter, setFilter] = useState("all")

  const restaurants = [
    {
      id: 1,
      name: "The Golden Grain",
      orders: 12,
      image: "/assets/HeroSectionRightImage.avif",
      role: "OWNER",
      status: "ACTIVE",
      revenue: "2,450.00",
    },
    {
      id: 2,
      name: "Mizumi Zen",
      orders: 28,
      image: "/assets/mizumi.jpg",
      role: "MANAGER",
      status: "BUSY",
      revenue: "4,120.00",
    },
    {
      id: 3,
      name: "Terracotta Grill",
      orders: 4,
      image: "/assets/terracotta.jpg",
      role: "OWNER",
      status: "ACTIVE",
      revenue: "1,890.00",
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <span className="text-orange-700 font-bold text-xs tracking-widest uppercase">
            Curation Hub
          </span>
          <h1 className="text-5xl font-extrabold text-stone-900 mt-2">
            Your Restaurant <br />
            Ecosystem
          </h1>
        </div>

        <div className="flex bg-orange-50/50 p-1.5 rounded-full border border-orange-100 shadow-sm">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === "all"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            All Venues
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === "active"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Active Only
          </button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((res) => (
          <Card
            key={res.id}
            className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-none shadow-xl rounded-[1.5rem] bg-white p-0 gap-0"
          >
            {/* Image Section */}
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={res.image}
                alt={res.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Status Badge */}
              <div className="absolute top-5 left-5">
                <Badge
                  className={`${
                    res.status === "ACTIVE"
                      ? "bg-orange-600 hover:bg-orange-600"
                      : "bg-amber-600 hover:bg-amber-600"
                  } text-white font-bold px-4 py-1.5 rounded-full text-[10px] tracking-widest border-none`}
                >
                  {res.status}
                </Badge>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Name Overlay */}
              <div className="absolute bottom-6 left-6 text-white text-left">
                <span className="text-[10px] font-bold tracking-[0.2em] opacity-80 block mb-1 uppercase">
                  Role: {res.role}
                </span>
                <h3 className="text-3xl font-bold tracking-tight">
                  {res.name}
                </h3>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 pb-4">
              {/* <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-700">
                    <ShoppingBasket size={18} />
                  </div>
                  <span className="text-sm font-semibold text-stone-600">
                    {res.orders} Pending Orders
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-stone-400 block tracking-widest leading-none mb-1">
                    DAILY REVENUE
                  </span>
                  <span className="text-xl font-black text-stone-800 tracking-tight">
                    ${res.revenue}
                  </span>
                </div>
              </div> */}

              <Button className="w-full bg-[#913D0C] hover:bg-[#7a340a] text-white rounded-full py-7 text-base font-bold flex items-center justify-center gap-2 group/btn shadow-lg shadow-orange-900/10">
                Enter Dashboard
                <ArrowRight
                  size={18}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </Button>
            </div>
          </Card>
        ))}

        {/* Add Venue Card */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-stone-200 rounded-[2.5rem] p-8 h-[300px] hover:border-orange-200 hover:bg-orange-50/20 transition-all group bg-white/50">
          <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Plus className="text-orange-700" size={32} />
          </div>
          <h3 className="text-xl font-bold text-stone-700 mb-2">
            Add New Venue
          </h3>
          <p className="text-stone-400 text-center text-sm max-w-[200px]">
            Expand your restaurant ecosystem by adding a new location.
          </p>
        </div>
      </div>
    </div>
  )
}