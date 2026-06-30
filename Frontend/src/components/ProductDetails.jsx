import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({
  addToCart,
  addToWishlist,
  removeFromWishlist,
  wishlistItems,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const wishlistItem = wishlistItems?.find(
    (item) => item.product_id === product?.id
  );

  const isWishlisted = !!wishlistItem;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto p-10">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 px-4 py-2 rounded"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image_url}
          alt={product.name}
          className="w-full rounded-xl"
        />

        <div>

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-slate-600 mb-4">
            {product.description}
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            ₹{product.price}
          </h2>

          <p className="mb-4">
            Stock: {product.stock_quantity}
          </p>

          <p className="mb-6">
            Category: {product.category}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product.id)}
              disabled={product.stock_quantity === 0}
              className={`px-6 py-3 rounded-xl font-semibold ${
                product.stock_quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {product.stock_quantity === 0
                ? "Out Of Stock"
                : "🛒 Add To Cart"}
            </button>

            <button
              onClick={() => {
                if (isWishlisted) {
                  removeFromWishlist(
                    wishlistItem.wishlist_id
                  );
                } else {
                  addToWishlist(product.id);
                }
              }}
              className={`px-6 py-3 rounded-xl font-semibold border ${
                isWishlisted
                  ? "border-red-500 text-red-500"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {isWishlisted
                ? "❤️ Remove from Wishlist"
                : "🤍 Add to Wishlist"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;