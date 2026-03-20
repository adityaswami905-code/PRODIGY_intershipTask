import { useEffect, useState } from "react";
import API from "../api/axios";
import PageWrapper from "../components/PageWrapper";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
  });

  // Fetch products
  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //  Add product
  const handleAdd = async () => {
    if (!form.name || !form.price) return alert("Fill required fields");

    setLoading(true);

    try {
      await API.post("/products", form);

      setForm({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
        stock: "",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //  Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <PageWrapper>
        <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] text-white p-6">

      {/*  HEADER */}
      <h1 className="text-4xl font-bold mb-6">
         Admin Dashboard
      </h1>

      {/*  ADD PRODUCT FORM */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg mb-8">

        <h2 className="text-xl font-semibold mb-4">
           Add New Product
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="p-2 rounded text-black"
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="p-2 rounded text-black"
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
            className="p-2 rounded text-black col-span-2"
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="p-2 rounded text-black"
          />

          <input
            placeholder="Stock"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
            className="p-2 rounded text-black"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="p-2 rounded text-black col-span-2"
          />
        </div>

        <button
          onClick={handleAdd}
          disabled={loading}
          className="mt-4 bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>

      {/*  PRODUCT LIST */}
      <h2 className="text-2xl font-semibold mb-4">
         Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow hover:scale-105 transition"
          >
            <img
              src={p.image}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="text-lg font-semibold mt-2">
              {p.name}
            </h3>

            <p className="text-gray-300 text-sm">
              {p.description}
            </p>

            <p className="text-yellow-400 font-bold mt-2">
              ₹{p.price}
            </p>

            <div className="flex justify-between items-center mt-3">

              <span className="text-sm text-gray-400">
                {p.category}
              </span>

              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
    </PageWrapper>
  );
};

export default Admin;