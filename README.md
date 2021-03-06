# Cocktail Delivery API

API endpoints for a Cocktail Delivery App. Items/Drinks data from The Cocktail DB API. 

## Add User

```
{
    "firstName": "user-first-name",
    "lastName": "user-last-name",
    "email": "user-email",
    "password": "user-password"
}
```

## Login

```
{
    "email": "user-email",
    "password": "user-password"
}
```

## Add Client

```
{
    "name": "client-name",
    "email": "client-email",
    "contactNo": "client-contact-number",
    "password": "client-password"
}
```

## Add Store

```
{
    "name": "store-name",
    "address": "store-address",
    "contactNo": "store-contact-number",
    "menu": [
        {
            "itemId": "drink-id-cocktaildb",
            "name": "drink-name-cocktaildb",
            "price": price
        }
    ]
}
```

## Add Order

```
{
    "userName": "user-name",
    "address": "user-address",
    "contactNo": "user-contact-details",
    "items": [
        {
            "name": "drink-name-cocktaildb",
            "price": price,
            "quantity": quantity
        }
    ],
    "total": total-price
}
```

## Search Item by Query (from CocktailDB)

```
/api/items/search?s=Mojito
```

## Search Item by Filter (from CocktailDB)

```
/api/items/filter?c=Cocktail
```

## Search Item by ID (from CocktailDB)

```
/api/items/lookup?i=11007
```
