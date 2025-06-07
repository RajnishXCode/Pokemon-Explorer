export interface Pokemon {
  image: string | URL
  id: number
  name: string
  sprites: {
    front_default?: string
    other?: {
      'official-artwork'?: {
        front_default?: string
      }
    }
  }
  types: {
    type: {
      name: string
    }
  }[]
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
  height: number // in decimeters
  weight: number // in hectograms
  abilities: {
    ability: {
      name: string
    }
    is_hidden: boolean
  }[]
}

// Helper function to convert height from decimeters to meters/feet
export function formatHeight(height: number): string {
  const meters = height / 10
  const feet = Math.floor(meters * 3.281)
  const inches = Math.round((meters * 3.281 - feet) * 12)
  
  return `${meters.toFixed(1)}m (${feet}'${inches}")` 
}

// Helper function to convert weight from hectograms to kg/lbs
export function formatWeight(weight: number): string {
  const kg = weight / 10
  const lbs = Math.round(kg * 2.205)
  
  return `${kg.toFixed(1)}kg (${lbs} lbs)`
}