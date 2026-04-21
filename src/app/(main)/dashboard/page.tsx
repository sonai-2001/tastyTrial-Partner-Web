'use client'

import { useAuth } from "@/hooks/useAuth"

const page = () => {
   const {activeRestaurant}= useAuth()
   console.log("activeRestaurant",activeRestaurant)
  return (
    <div>page</div>
  )
}

export default page