import { Photo } from "./Photo"

export interface member {
    id: number
    userName: string
    photoUrl: string
    age: number
    knownAs: string
    lookingFor: string
    created_On: string
    lastActive: string
    gender: string
    introduction: string
    city: string
    country: string
    photos: Photo[]
  }