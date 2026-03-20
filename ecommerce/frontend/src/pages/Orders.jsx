import { useEffect, useState } from "react";
import API from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await API.get("/orders");
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  const steps = ["Processing", "Shipped", "Delivered"];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] text-white">

      <h1 className="text-3xl font-bold mb-6"> Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl">No Orders Yet</h2>
        </div>
      ) : (
        <div className="space-y-8">

          {orders.map((order) => {
            const currentStep = steps.indexOf(order.status);

            return (
              <div
                key={order._id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg"
              >

                {/*  HEADER */}
                <div className="flex justify-between items-center mb-4">

                  <div>
                    <p className="text-sm text-gray-400">
                      Order ID: {order._id}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="px-4 py-1 bg-yellow-500 rounded-full text-sm">
                    {order.status}
                  </span>
                </div>

                {/*  DELIVERY TIMELINE */}
                <div className="flex justify-between items-center mb-6">

                  {steps.map((step, index) => (
                    <div key={step} className="flex-1 text-center relative">

                      <div
                        className={`w-6 h-6 mx-auto rounded-full ${
                          index <= currentStep
                            ? "bg-green-500"
                            : "bg-gray-600"
                        }`}
                      ></div>

                      <p className="text-xs mt-1">{step}</p>

                      {index !== steps.length - 1 && (
                        <div className="absolute top-3 left-1/2 w-full h-1 bg-gray-600">
                          <div
                            className={`h-1 ${
                              index < currentStep
                                ? "bg-green-500"
                                : "bg-gray-600"
                            }`}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}

                </div>

                {/*  ITEMS */}
                <div className="space-y-4 mb-4">

                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4"
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
                <div className="border-t border-gray-600 pt-3 mb-3">
                  <p className="text-sm text-gray-400">Delivery Address</p>
                  <p>
                    {order.address?.name}, {order.address?.city}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {order.address?.address}
                  </p>
                </div>

                {/*  PAYMENT */}
                <div className="border-t border-gray-600 pt-3 mb-3">
                  <p className="text-sm text-gray-400">Payment</p>
                  <p>Cash on Delivery</p>
                </div>

                {/*  TOTAL */}
                <div className="flex justify-between items-center border-t border-gray-600 pt-3">

                  <span className="text-lg font-semibold">
                    Total:
                  </span>

                  <span className="text-xl font-bold text-yellow-400">
                    ₹{order.total}
                  </span>

                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default Orders;