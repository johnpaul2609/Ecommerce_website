import {
  FaShoppingCart,
  FaBoxOpen,
  FaSignOutAlt,
  FaStore,
  FaUser,
  FaHeart,
} from "react-icons/fa";
function Navbar({
  loadProducts,
  viewCart,
  viewOrders,
  viewProfile,
  viewWishlist,
  logoutUser,
}) {
  return (
    <nav className="bg-gradient-to-r from-blue-900 via-indigo-900 to-cyan-900 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="bg-white text-blue-700 p-3 rounded-full shadow-md">
              <FaStore size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                JP Ecommerce
              </h1>

              <p className="text-slate-300 text-sm">
                Shop Smart, Live Better
              </p>
            </div>

          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-3">

            <button
              onClick={loadProducts}
              className="
                flex items-center gap-2
                bg-white/10
                text-white
                px-5 py-2
                rounded-xl
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              <FaStore />
              Products
            </button>

            <button
              onClick={viewCart}
              className="
                flex items-center gap-2
                bg-white/10
                text-white
                px-5 py-2
                rounded-xl
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              <FaShoppingCart />
              Cart
            </button>

            <button
              onClick={viewOrders}
              className="
                flex items-center gap-2
                bg-white/10
                text-white
                px-5 py-2
                rounded-xl
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              <FaBoxOpen />
              Orders
            </button>



            <button
              onClick={viewProfile}
              className="
              flex items-center gap-2
              bg-white/10
              text-white
              px-5 py-2
              rounded-xl
              hover:bg-white/20
              transition-all
              duration-300
            "
            >
              <FaUser />
              Profile
            </button>

            <button
              onClick={viewWishlist}
              className="
                flex items-center gap-2
                bg-white/10
                text-white
                px-5 py-2
                rounded-xl
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              <FaHeart />
              Wishlist
            </button>

            <button
              onClick={logoutUser}
              className="
              flex items-center gap-2
              bg-red-500
              text-white
              px-5 py-2
              rounded-xl
              hover:bg-red-600
              transition-all
              duration-300
            "
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
