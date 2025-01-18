import { useState, type FormEvent } from "react";
import { postProduct } from "~/services/clientData";
import Loader from "../loader";

interface Props {
  categories: string[];
}

const FormAdd: React.FC<Props> = ({ categories }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
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
    const product = await postProduct(newProduct);
    setLoading(false);
    console.log(product);
    return product;
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
        <input
          type="text"
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
      <label className="flex gap-4">
        categoría
        <select name="categories" onChange={(e) => setCategory(e.target.value)}>
          <option value="">Categorías</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>
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
export default FormAdd;
