
import {
  FaTrash,
  FaShoppingCart,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

function Cart({
  cartItems,
  totalAmount,
  updateQuantity,
  removeFromCart,
  placeOrder,
}) {
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
            <FaShoppingCart />
            My Cart
          </h1>

          <p className="text-slate-500 mt-2">
            Review your selected products
          </p>

        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <h2 className="text-3xl font-bold text-slate-600">
              Your Cart is Empty 🛒
            </h2>

            <p className="text-slate-500 mt-3">
              Add products to your cart and start shopping.
            </p>

          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">

              {cartItems.map((item) => (
                <div
                  key={item.cart_id}
                  className="
                    bg-white
                    rounded-2xl
                    shadow-lg
                    p-5
                    flex
                    flex-col
                    md:flex-row
                    gap-5
                    items-center
                  "
                >

                  {/* Image */}
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    className="
                      w-40
                      h-32
                      object-cover
                      rounded-xl
                    "
                  />

                  {/* Details */}
                  <div className="flex-1">

                    <h3 className="text-xl font-bold text-slate-800">
                      {item.product_name}
                    </h3>

                    <p className="text-blue-600 font-bold text-lg mt-2">
                      ₹{item.price}
                    </p>

                    <p className="text-slate-500 mt-1">
                      Subtotal: ₹
                      {item.price * item.quantity}
                    </p>

                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.cart_id,
                          "decrease"
                        )
                      }
                      className="
                        bg-red-500
                        text-white
                        p-2
                        rounded-lg
                        hover:bg-red-600
                      "
                    >
                      <FaMinus />
                    </button>

                    <span className="font-bold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.cart_id,
                          "increase"
                        )
                      }
                      className="
                        bg-green-500
                        text-white
                        p-2
                        rounded-lg
                        hover:bg-green-600
                      "
                    >
                      <FaPlus />
                    </button>

                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeFromCart(
                        item.cart_id
                      )
                    }
                    className="
                      bg-red-500
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      hover:bg-red-600
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <FaTrash />
                    Remove
                  </button>

                </div>
              ))}

            </div>

            {/* Order Summary */}
            <div>

              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">

                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span>Total Items</span>
                    <span className="font-bold">
                      {cartItems.length}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Total Amount</span>
                    <span className="font-bold text-blue-600">
                      ₹{totalAmount}
                    </span>
                  </div>

                </div>

                <button
                  onClick={placeOrder}
                  className="
                    w-full
                    mt-8
                    py-4
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    text-white
                    font-bold
                    hover:scale-105
                    transition-all
                  "
                >
                  Place Order 🚀
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Cart;
