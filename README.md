# Cocktail Delivery API

API endpoints for a Cocktail Delivery App. 

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

```

## Add Order

```

```

## Search Item by Query (from CocktailDB)

```
/api/items/search?s=Mojito
```

## Search Item by Filter (from CocktailDB)

```
/api/items/filter?c=Cocktail
```
