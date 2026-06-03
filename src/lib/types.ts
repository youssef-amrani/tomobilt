export interface Car {
  id: string
  name: string
  brand: string
  seats: number
  doors: number
  transmission: string
  fuel: string
  consumption: string
  price_per_day: number
  price_per_week: number
  deposit: number
  km_included: number
  colors: CarColor[]
  images: CarImage[]
  features: string[]
  created_at: string
}

export interface CarColor {
  id: string
  car_id: string
  name: string
  hex: string
}

export interface CarImage {
  id: string
  car_id: string
  color_id: string
  url: string
}

export interface Reservation {
  id: string
  car_id: string
  user_id?: string
  client_name: string
  client_email: string
  client_phone: string
  start_date: string
  end_date: string
  total_price: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  created_at: string
}

export interface Profile {
  id: string
  email: string
  full_name?: string
  role: "admin" | "user"
  created_at: string
}
