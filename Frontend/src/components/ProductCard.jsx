import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  wishlistItems,
}) {
  const navigate = useNavigate();
  const wishlistItem = wishlistItems?.find(
    (item) => item.product_id === product.id
  );

  const isWishlisted = !!wishlistItem;

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        overflow-hidden
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      {/* Product Image */}
      <div className="overflow-hidden relative">
        <img
          src={product.image_url}
          alt={product.name}
          onClick={() =>
            navigate(`/product/${product.id}`)
          }
          className="
            w-full
            h-52
            object-cover
            hover:scale-110
            transition-transform
            duration-500
            cursor-pointer
          "
        />

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
            absolute
            top-2
            right-2
            bg-white/80
            p-2
            rounded-full
            hover:bg-white
            transition-colors
            ${
              isWishlisted
                ? "text-red-500"
                : "text-gray-400"
            }
          `}
        >
          <FaHeart />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-5">

        {/* Category Badge */}
        <div className="mb-3">
          <span
            className="
              bg-blue-100
              text-blue-700
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
            "
          >
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h2
          onClick={() =>
            navigate(`/product/${product.id}`)
          }
          className="
            text-xl
            font-bold
            text-slate-800
            mb-2
            line-clamp-1
            cursor-pointer
            hover:text-blue-600
          "
        >
          {product.name}
        </h2>

        {/* Description */}
        <p
          className="
            text-slate-500
            text-sm
            h-12
            overflow-hidden
            mb-4
          "
        >
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-3">
          <span
            className="
              text-2xl
              font-bold
              text-blue-600
            "
          >
            ₹{product.price}
          </span>
        </div>

        {/* Stock */}
        <div className="mb-5">
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

        {/* Add To Cart */}
        <button
          onClick={() =>
            addToCart(product.id)
          }
          disabled={
            product.stock_quantity === 0
          }
          className={`
            w-full
            py-3
            rounded-xl
            font-semibold
            transition-all
            duration-300
            ${
              product.stock_quantity === 0
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-105 hover:shadow-lg"
            }
          `}
        >
          {product.stock_quantity === 0
            ? "Out Of Stock"
            : "🛒 Add To Cart"}
        </button>

      </div>
    </div>
  );
}

export default ProductCard;