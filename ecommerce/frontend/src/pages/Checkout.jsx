import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!address.name || !address.phone || !address.city || !address.address) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await API.post("/orders", {
        items: cart,
        total: totalPrice,
        address,
      });

      toast.success("Order placed successfully ");

      clearCart();
      navigate("/orders");

    } catch (err) {
      toast.error("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] text-white">

      <h1 className="text-3xl font-bold mb-6"> Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/*  LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/*  CART ITEMS */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4"> Order Items</h2>

            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 mb-4"
              >
                <img
                  src={item.image}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <p>{item.name}</p>
                  <p className="text-gray-400 text-sm">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))}
          </div>

          {/*  ADDRESS */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4"> Delivery Address</h2>

            <div className="grid grid-cols-2 gap-4">

              <input
                placeholder="Full Name"
                value={address.name}
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
                className="p-2 rounded text-white border border-gray-500"
              />

              <input
                placeholder="Phone"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
                className="p-2 rounded text-white border border-gray-500"
              />

              <input
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="p-2 rounded border border-gray-500 text-white"
              />

              <input
                placeholder="Address"
                value={address.address}
                onChange={(e) =>
                  setAddress({ ...address, address: e.target.value })
                }
                className="p-2 rounded text-white border border-gray-500 col-span-2"
              />

            </div>
          </div>

          {/*  PAYMENT */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">💳 Payment Method</h2>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" defaultChecked />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" disabled />
                UPI / Card (Coming Soon)
              </label>
            </div>
          </div>

        </div>

        {/*  RIGHT SIDE */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow h-fit">

          <h2 className="text-xl font-semibold mb-4"> Order Summary</h2>

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
            onClick={handleOrder}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            {loading ? "Placing..." : "Placed Order "}
          </button>

        </div>

      </div>
    </div>
  );
};

export default Checkout;