import { useState, type FormEvent } from "react";
import { patchProduct, postProduct } from "~/services/clientData";
import Loader from "../loader";
import type { Product } from "~/type";

interface Props {
  categories: string[];
  product: Product;
}

const FormPatch: React.FC<Props> = ({ categories, product }) => {
  if (!product) return;
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const newProduct = {
      title,
      description,
      image,
      price,
      category,
      rating: {
        count: 0,
        rate: 5,
      },
    };
    const currentProduct = await patchProduct(product.id, newProduct);
    setLoading(false);
    return currentProduct;
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <label className="flex gap-4">
        titulo
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label className="flex gap-4">
        descripción
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </label>
      <label className="flex gap-4">
        imagen
        <input
          type="text"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
      </label>
      <label className="flex gap-4">
        precio
        <input
          type="text"
          onChange={(e) => setPrice(Number(e.target.value))}
          value={price}
        />
      </label>
      <label htmlFor="categories" className="flex gap-4">
        categoría
        <select
          name="categories"
          id="categories"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" label="Categorías"></option>
          {categories.map((c, i) => (
            <option key={i} value={c} defaultChecked={c === product.category}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <button className="px-5 py-2 bg-blue-50 text-black rounded">
        Enviar {loading && <Loader />}
      </button>
    </form>
  );
};
export default FormPatch;
