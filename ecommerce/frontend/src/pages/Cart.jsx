import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQty,
    totalPrice,
  } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] text-white">

      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (

        /*  EMPTY STATE */
        <div className="flex flex-col items-center justify-center h-[60vh]">

          <div className="text-6xl mb-4">🛒</div>

          <h2 className="text-2xl font-semibold mb-2">
            Your cart is empty
          </h2>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:scale-105 transition"
          >
            Shop Now
          </button>

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* 🛍 LEFT: CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow hover:scale-[1.01] transition"
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    ₹{item.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-2">

                    <button
                      onClick={() =>
                        updateQty(item._id, item.qty - 1)
                      }
                      className="px-3 py-1 bg-gray-700 rounded"
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() =>
                        updateQty(item._id, item.qty + 1)
                      }
                      className="px-3 py-1 bg-gray-700 rounded"
                    >
                      +
                    </button>

                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          {/*  RIGHT: SUMMARY */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg h-fit">

            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Items:</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>

            <hr className="my-4 border-gray-600" />

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Proceed to Checkout 
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;