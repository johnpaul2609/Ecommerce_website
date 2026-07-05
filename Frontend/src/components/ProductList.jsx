import ProductCard from "./ProductCard";

function ProductList({
  products,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  wishlistItems,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) {
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    "Mobiles",
    "Laptops",
    "Headphones",
    "Smart Watches",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-cyan-900 text-white py-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-4">
            🛒 JP Ecommerce Store
          </h1>

          <p className="text-xl text-slate-300">
            Discover Amazing Products at the Best Prices
          </p>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Search */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="🔍 Search Products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="
              w-full
              max-w-xl
              px-5
              py-4
              rounded-full
              border
              border-slate-300
              shadow-md
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              text-lg
            "
          />
        </div>

        {/* Categories */}
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`
                px-6 py-3 rounded-full font-semibold
                transition-all duration-300
                ${selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-slate-700 shadow hover:bg-blue-100"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <div className="text-center mb-8">
          <span className="bg-white px-5 py-2 rounded-full shadow font-semibold text-slate-700">
            {filteredProducts.length} Products Found
          </span>
        </div>

        {/* Product Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-8
          "
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              wishlistItems={wishlistItems}
            />
          ))}
        </div>

        {/* No Products */}
        {filteredProducts.length === 0 && (
          <div className="text-center mt-20">

            <h2 className="text-3xl font-bold text-slate-600">
              No Products Found 😔
            </h2>

            <p className="text-slate-500 mt-2">
              Try another search keyword.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default ProductList;