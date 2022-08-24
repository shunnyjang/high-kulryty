select 
    "user".id,
    star_user.title,
    "user".name,
    star_user.type,
    basket.*,
    product.*
from "user", star_user, basket, product, basket_products
where 1=1
    and "user".id = basket.user_id
    and "user".id = star_user.user_id
    and basket.user_id = star_user.user_id
    and basket_products.basket.id = basket.id
    and basket_products.product_id = product.id
order by "user".id, basket.id, product.id
;
