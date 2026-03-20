const FilterSidebar = ({ setCategory }) => {
  const categories = ["All", "Electronics", "Footwear"];

  return (
    <div className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 text-white">

      <h2 className="text-xl font-bold mb-6"> Filters</h2>

      <div className="space-y-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat === "All" ? "" : cat)}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-purple-500 transition"
          >
            {cat}
          </button>
        ))}
      </div>

    </div>
  );
};

export default FilterSidebar;