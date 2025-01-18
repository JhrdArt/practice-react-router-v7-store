import { useEffect, useState, type ChangeEvent } from "react";
import type { Route } from "./+types/Products";
import type { Product } from "~/type";
import Card from "~/components/card";
import Loader from "~/components/loader";
import { Link, useNavigate, useParams } from "react-router";
import Select from "~/components/select";
import {
  getAllProducts,
  getProductByCategory,
  getProductsWithLimit,
} from "~/services/clientData";
import Modal from "~/components/modal";
import FormAdd from "~/components/forms/form-add";

export const HydrateFallBack = () => {
  return <div>Loading...</div>;
};

const Products = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [limit, setLimit] = useState(4);
  const [loading, setLoading] = useState(false);
  const [onClose, setOnClose] = useState(false);

  const navigate = useNavigate();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const products = await getProductsWithLimit(limit);
      setProducts(products);
    } catch (error) {
      console.error("error fetching products" + error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const products = await getAllProducts();
      setAllProducts(products);
    } catch (error) {
      console.error("error fetching products" + error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [limit]);

  useEffect(() => {
    loadProducts();
  }, []);

  const uniqueCategories = Array.from(
    new Set(allProducts.map((p) => p.category))
  );

  const handleLimitProducts = () => {
    setLimit((prev) => prev + 4);
  };

  return (
    <div className="w-full h-full space-y-10 relative">
      <Modal
        onClose={onClose}
        setOnClose={setOnClose}
        children={<FormAdd categories={uniqueCategories} />}
      />
      <div className="space-x-4">
        <button
          className="bg-white text-black p-2 rounded"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          onClick={() => setOnClose(true)}
          className="bg-blue-600 p-2 rounded hover:bg-blue-600/90"
        >
          Añadir
        </button>
      </div>
      <h2>Aquí se muestran los productos</h2>

      <div className="flex gap-5 flex-col pl-4">
        <p>Filtrar por:</p>
        <div className="flex gap-10 items-center">
          {uniqueCategories.map((category, index) => (
            <Link
              key={index}
              className="bg-blue-500 p-2 rounded"
              to={`/products/${encodeURI(category)}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 w-full gap-y-20 gap-x-10 place-content-center place-items-center">
        {loading ? (
          <Loader />
        ) : (
          <>
            {products.map((product, index) => (
              <Card key={index} product={product} />
            ))}
          </>
        )}
      </div>
      <div className="py-10 w-60 m-auto">
        {!loading && (
          <button
            onClick={() => {
              handleLimitProducts();
            }}
            className="bg-red-500 p-2 rounded hover:bg-red-500/90 flex items-center justify-center gap-2 w-full mb-10"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};
export default Products;
