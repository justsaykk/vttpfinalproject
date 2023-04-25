# Client Side Foundation (VTTP) Final Project

## App Introduction

1. This application is a "e-commerce" application. Users will be able to find a cocktail of their choice and purchase it. It is supposed to simulate an order being sent to a bar.
2. The API used for this application is [CocktailDB](https://www.thecocktaildb.com/)

## Workflows

### Flow 1 (Home Page --> DetailedDrink Page)

1. This is the page that users will see when they access the application. This page basically contains a banner and 3 cards.
2. These 3 cards will lead the user to a detailed view of the drink in question.

### Flow 2 (Home Page --> Menu --> Checkout)

1. Expanding the hamburger will allow users to navigate to the Menu page.
2. In the menu page, the default drinks are rum-based. The page has pagination controls and if it needs to load data, a spinner will appear.
3. Users can search for more drinks based on their favourite alcohol by using the search bar.
4. Clicking "Add to cart" will add the drink into the cart. The cart icon should start to have a bubble with the number of drinks in it.
5. Clicking on the cart icon will prompt an overlay of the current items in the cart. The user can then proceed to pay. When the user clicks "Order", the button should change to a spinner.
6. If the cart is empty, the "Order" button will be disabled.
7. The user will be redirected to a stripe checkout page where the user can input their card details for payment. Once the payment is successful, the user will be redirected back to the application.

### Flow 3 (Home Page --> Profile --> Edit Profile)

1. The transactions are stored in MongoDB and is retrieved when the user navigates to their profile.
2. For the user to perform this navigation, users will have to be logged into the application.
3. For this application, the OAuth2 provider is Firebase.
4. In the profile page, users are able to see their past transaction as well as edit their profile details.
5. In this application, user are able to change their profile pictures and name only as emails are used as a key to for MongoDB.

### Instructions for Instructors

1. You can create your profile by clicking on the sign up link during login or if you prefer, you could also use your google account.
2. To create the account, the password needs to be longer than 6 characters. You can use any email you want.
3. When you're checking out, please use the following details for a successful checkout process:

    ```xml
    Email: your-login-email@email.com
    Phone: your-sg-number (You will receive a sms. Check your LIKELY-SCAM chat)
    Card Information
    Card Number: 4242 4242 4242 4242
    MM/YY: anything
    CVC: anything

    Click "Pay"
    ```

4. Upon successful transaction, you will be redirected back to the app.
