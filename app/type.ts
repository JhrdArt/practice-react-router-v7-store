export type Product = {
    category: string,
    description: string,
    id: number,
    image: string,
    rating: {
        rate: number,
        count: number
    },
    title: string,
    price: number
}