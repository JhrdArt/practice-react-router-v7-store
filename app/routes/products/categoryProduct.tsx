import { getProductByCategory } from "~/services/clientData";
import type { Route } from "./+types/Products";
import type { Product } from "~/type";
import { useEffect, useState } from "react";
import Card from "~/components/card";
import Select from "~/components/select";
import { useNavigate } from "react-router";
import Loader from "~/components/loader";

interface Props {
  /*Props*/
}

export async function loader({ params }: Route.LoaderArgs) {
  const products = getProductByCategory(params.category!);
  return products;
}

const CategoryProduct = ({
  loaderData,
}: Route.ComponentProps & { loaderData: Product }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (loaderData) {
      setProducts(loaderData);
      setFilteredProducts(loaderData);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const sortedProducts = [...products];
    switch (typeFilter) {
      case "Mayor precio":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Menor precio":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "Nombre A - Z":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Nombre Z - A":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Más populares":
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  }, [typeFilter, products]);

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() => navigate("/products")}
        className="bg-blue-500 p-2 rounded"
      >
        Volver a productos
      </button>
      <div className="space-x-4">
        <Select selectList={selectOptions} setValue={setTypeFilter} />
        <button
          className="bg-red-500 p-2 rounded"
          onClick={() => setTypeFilter("")}
        >
          Borrar filtros
        </button>
      </div>

      <div className="grid grid-cols-6 gap-10">
        {loading ? (
          <Loader />
        ) : (
          filteredProducts.map((product, index) => (
            <Card key={index} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;

const selectOptions = [
  "Mayor precio",
  "Menor precio",
  "Nombre A - Z",
  "Nombre Z - A",
  "Más populares",
];
