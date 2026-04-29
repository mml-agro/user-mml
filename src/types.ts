export interface Product {
  id: number
  name: string
  brand: string
  category: 'sunflower'|'specialty'|'traditional'
  description: string
  shortDesc: string
  price: {'1L':number;'5L':number;'15L':number}
  features: string[]
  badge?: string
  emoji: string
  color: string
  bgColor: string
  rating: number
  reviews: number
}
export interface CartItem { product:Product; size:'1L'|'5L'|'15L'; quantity:number }
export interface User { name:string; email:string; phone:string; avatar?:string }
export interface Order { id:string; date:string; status:'Delivered'|'Processing'|'Shipped'|'Cancelled'; items:string[]; total:number }
export interface Blog { id:number; title:string; excerpt:string; date:string; readTime:string; emoji:string; category:string }
export interface Testimonial { id:number; name:string; city:string; text:string; rating:number; product:string }
export interface TeamMember { name:string; role:string; emoji:string }
