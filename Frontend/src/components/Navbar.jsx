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

      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">

            <div className="bg-white text-blue-700 p-2 md:p-3 rounded-full shadow-md">
              <FaStore size={20} />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                JP Ecommerce
              </h1>

              <p className="text-slate-300 text-xs md:text-sm">
                Shop Smart, Live Better
              </p>
            </div>

          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">

            <button
              onClick={loadProducts}
              className="
                flex items-center gap-1 md:gap-2
                bg-white/10
                text-white
                px-3 py-2 md:px-5 md:py-2
                rounded-lg md:rounded-xl
                text-sm md:text-base
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
                flex items-center gap-1 md:gap-2
                bg-white/10
                text-white
                px-3 py-2 md:px-5 md:py-2
                rounded-lg md:rounded-xl
                text-sm md:text-base
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
                flex items-center gap-1 md:gap-2
                bg-white/10
                text-white
                px-3 py-2 md:px-5 md:py-2
                rounded-lg md:rounded-xl
                text-sm md:text-base
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
              flex items-center gap-1 md:gap-2
              bg-white/10
              text-white
              px-3 py-2 md:px-5 md:py-2
              rounded-lg md:rounded-xl
              text-sm md:text-base
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
                flex items-center gap-1 md:gap-2
                bg-white/10
                text-white
                px-3 py-2 md:px-5 md:py-2
                rounded-lg md:rounded-xl
                text-sm md:text-base
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
              flex items-center gap-1 md:gap-2
              bg-red-500
              text-white
              px-3 py-2 md:px-5 md:py-2
              rounded-lg md:rounded-xl
              text-sm md:text-base
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
