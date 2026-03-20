import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`);
  };

  return (
    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 group">

      {/*  Glow effect (FIXED) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition"></div>

      {/*  Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      {/*  Info */}
      <h2 className="text-white text-lg font-semibold mt-3">
        {product.name}
      </h2>

      <p className="text-gray-300 text-sm line-clamp-2">
        {product.description}
      </p>

      <p className="text-yellow-400 text-xl font-bold mt-2">
        ₹{product.price}
      </p>

      {/*  Button */}
      <button
        onClick={handleAdd}
        className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-2 rounded-xl hover:scale-105 active:scale-95 transition"
      >
        Add to Cart 
      </button>

    </div>
  );
};

export default ProductCard;