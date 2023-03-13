export interface Drink {
    idDrink: string
    strDrink: string
    strDrinkThumb: string
    strDrinkImage: string
}

export interface Ingredient {
    ingredient: string
    ingredientThumbnail: string
}

export interface CartItem {
    drink: Drink
    quantity: number
  }