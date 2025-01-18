import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), ...prefix("products", [
    index("./routes/products/Products.tsx"),
    route(":pid/:title", "./routes/products/product-details.tsx"),
    route(":category", "./routes/products/categoryProduct.tsx")
])] satisfies RouteConfig;
