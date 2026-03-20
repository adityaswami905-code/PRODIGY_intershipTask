import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import FilterSidebar from "../components/FilterSidebar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  //  Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //  Filter logic
  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      category ? p.category === category : true
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b]">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 opacity-20 blur-3xl"></div>

      {/* NAVBAR */}
      <Navbar search={search} setSearch={setSearch} />

      <div className="flex">

        {/*  SIDEBAR */}
        <FilterSidebar setCategory={setCategory} />

        {/*  MAIN */}
        <div className="flex-1 p-8">

          {/*  HERO SECTION */}
          <div className="relative overflow-hidden rounded-2xl p-10 mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 shadow-xl">
            <div className="absolute inset-0 bg-white opacity-10 blur-2xl"></div>

            <h1 className="text-4xl font-bold text-white mb-2">
               Discover Premium Products
            </h1>

            <p className="text-lg text-gray-100 mb-4">
              Best quality items curated just for you 
            </p>

            <button
              onClick={() => setCategory("")}
              className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              Shop Now
            </button>
          </div>

          {/*  CATEGORY SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {["Electronics", "Footwear", "Fashion"].map((cat) => (
              <div
                key={cat}
                onClick={() => setCategory(cat)}
                className="bg-white/10 backdrop-blur-xl p-6 rounded-xl hover:scale-105 transition cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-white">{cat}</h3>
                <p className="text-gray-400 text-sm">
                  Explore latest {cat}
                </p>
              </div>
            ))}
          </div>

          {/*  TRENDING SECTION */}
          <h2 className="text-2xl font-bold text-white mb-4">
             Trending Now
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 bg-white/10 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>

          {/*  LOADING */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-60 bg-gray-700 animate-pulse rounded-xl"
                ></div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (

            /*  EMPTY STATE */
            <div className="flex flex-col items-center justify-center h-[50vh] text-white">

              <div className="text-6xl mb-4">🛍</div>

              <h2 className="text-3xl font-bold mb-2">
                No Products Yet
              </h2>

              <p className="text-gray-400 mb-6">
                Start exploring categories or add products from admin
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:scale-105 transition"
              >
                Explore Products
              </button>

            </div>

          ) : (

            /* 🛍 PRODUCT GRID */
            <>
              <h2 className="text-2xl font-bold text-white mb-6">
                 Premium Collection
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Home;