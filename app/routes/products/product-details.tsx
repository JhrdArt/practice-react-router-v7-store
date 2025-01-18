import { getProductById } from "~/services/clientData";
import type { Route } from "./+types/Products";
import type { Product } from "~/type";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loader from "~/components/loader";

interface Props {
  /*Props*/
}

export async function loader({ params }: Route.LoaderArgs) {
  if (params.pid) {
    const response = await getProductById(params.pid);
    return response;
  }
}

const ProductDetails = ({
  loaderData,
}: Route.ComponentProps & { loaderData: Product }) => {
  if (!loaderData) {
    return <Loader />;
  }

  const navigate = useNavigate();
  console.log(loaderData);
  const { category, description, id, image, price, rating, title } =
    loaderData as Product;

  const handleBack = () => {
    navigate("/products");
  };

  return (
    <div className="bg-red-500 w-full h-full p-8">
      <button className="bg-blue-600 p-2 rounded" onClick={handleBack}>
        Atrás
      </button>
      <div className="w-96">
        <h2>{title}</h2>
        <div className="w-60 h-60 ">
          <img
            src={image}
            className="w-full h-full object-contain"
            alt={title}
          />
        </div>
        <div>
          <em>{category}</em>
          <p>{description}</p>
        </div>
        <strong>{price.toString()}</strong>
      </div>
    </div>
  );
};
export default ProductDetails;
