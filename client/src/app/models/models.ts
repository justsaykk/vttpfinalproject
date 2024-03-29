export interface Drink {
    idDrink: string
    strDrink: string
    strDrinkThumb: string
    strDrinkImage: string
    price: number
}

export interface Ingredient {
    ingredient: string
    ingredientThumbnail: string
}

export interface CartItem {
    drink: Drink
    quantity: number
  }

export interface TransactionDetail {
    session_id: string
    customer_email: string
    customer_phone: string
    cart_items: CartItem[]
}

export interface User {
    name: string
    email: string
    profilePic: string
    firebaseUID: string
}

export interface DetailedDrink {
    idDrink: string,
    strDrink: string,
    strDrinkThumb: string,
    strDrinkImage: string,
    strInstructions: string,
    [key: string] : string
}