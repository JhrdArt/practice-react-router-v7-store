import type { Product } from "~/type";
import type { Route } from "../routes/products/+types/Products";
import { Link } from "react-router";

interface Props {
  product: Product;
}

const Card: React.FC<Props> = ({ product }) => {
  const stars = Array.from({ length: Math.floor(product.rating.rate) });

  return (
    <div className="w-64 h-96 col-span-1 p-2 border rounded flex flex-col bg-white">
      <Link
        to={`/products/${product.id}/${encodeURIComponent(product.title)}`}
        className="space-y-5"
      >
        <div className="relative group">
          <h2 className="whitespace-nowrap overflow-hidden text-ellipsis text-black">
            {product.title}
          </h2>
          <span className="absolute left-5 p-2 bg-black text-white rounded opacity-0 invisible transition-opacity duration-300 delay-500 group-hover:opacity-100 group-hover:visible">
            {product.title}
          </span>
        </div>
        <div className="w-40 h-40 aspect-auto mx-auto">
          <img
            className="object-contain w-full h-full"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div>
          {stars.map((_, i) => (
            <span key={i}>"⭐"</span>
          ))}
        </div>
        <p className="text-black before:content-['$'] font-bold text-xl">
          {product.price}
        </p>
      </Link>
      <div className="flex gap-2 mt-auto">
        <button className="bg-blue-500 p-2 rounded-md mt-auto">Agregar</button>
        <button className="bg-purple-500  p-2 rounded-md mt-auto">
          Editar
        </button>
        <button className="bg-red-500  p-2 rounded-md mt-auto">Eliminar</button>
      </div>
    </div>
  );
};
export default Card;
