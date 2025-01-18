import { Link } from "react-router";
import type { Route } from "./+types/home";
import Products from "./products/Products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Practicando" },
    { name: "description", content: "Practicando v7" },
  ];
}

export default function Home() {
  return (
    <div className="text-red-500">
      <nav>
        <ul className="flex gap-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const links = [
  { name: "home", to: "/" },
  { name: "products", to: "/products" },
  { name: "product details", to: "/products-details" },
];
