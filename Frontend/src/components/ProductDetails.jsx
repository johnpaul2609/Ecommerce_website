import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({
  products,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  wishlistItems,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">

          <h1 className="text-3xl font-bold mb-4">
            Product Not Found
          </h1>

          <button
            onClick={() => navigate("/")}
            className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-lg
            "
          >
            Back to Products
          </button>

        </div>
      </div>
    );
  }

  const wishlistItem = wishlistItems?.find(
    (item) => item.product_id === product.id
  );

  const isWishlisted = !!wishlistItem;

  return (
    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <button
          onClick={() => navigate("/")}
          className="
            mb-6
            bg-slate-200
            hover:bg-slate-300
            px-4
            py-2
            rounded-lg
          "
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Product Image */}
          <div>
            <img
              src={product.image_url}
              alt={product.name}
              className="
                w-full
                rounded-2xl
                shadow-lg
                object-cover
              "
            />
          </div>

          {/* Product Info */}
          <div>

            <span
              className="
                bg-blue-100
                text-blue-700
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold
              "
            >
              {product.category}
            </span>

            <h1 className="text-4xl font-bold mt-4">
              {product.name}
            </h1>

            <p className="text-slate-600 mt-4">
              {product.description}
            </p>

            <h2
              className="
                text-4xl
                font-bold
                text-blue-600
                mt-6
              "
            >
              ₹{product.price}
            </h2>

            <div className="mt-4">
              {product.stock_quantity > 0 ? (
                <span
                  className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >
                  In Stock ({product.stock_quantity})
                </span>
              ) : (
                <span
                  className="
                    bg-red-100
                    text-red-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >
                  Out Of Stock
                </span>
              )}
            </div>

            <div className="flex gap-4 mt-8">

              <button
                onClick={() => addToCart(product.id)}
                disabled={
                  product.stock_quantity === 0
                }
                className="
                  bg-blue-600
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  hover:bg-blue-700
                "
              >
                🛒 Add To Cart
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
                className={`
                  px-6
                  py-3
                  rounded-xl
                  text-white
                  ${
                    isWishlisted
                      ? "bg-red-500"
                      : "bg-pink-500"
                  }
                `}
              >
                {isWishlisted
                  ? "❤️ Remove Wishlist"
                  : "🤍 Add Wishlist"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;