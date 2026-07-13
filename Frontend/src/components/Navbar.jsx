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
          <div className="flex flex-row items-center gap-1 overflow-x-auto whitespace-nowrap w-full pb-2 md:pb-0 md:justify-center md:gap-3">

            <button
              onClick={loadProducts}
              className="
                flex items-center gap-1
                bg-white/10
                text-white
                px-2 py-1.5
                rounded-lg
                text-xs
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              <FaStore size={12} />
              Products
            </button>

            <button
              onClick={viewCart}
              className="
                flex items-center gap-1
                bg-white/10
                text-white
                px-2 py-1.5
                rounded-lg
                text-xs
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              <FaShoppingCart size={12} />
              Cart
            </button>

            <button
              onClick={viewOrders}
              className="
                flex items-center gap-1
                bg-white/10
                text-white
                px-2 py-1.5
                rounded-lg
                text-xs
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              <FaBoxOpen size={12} />
              Orders
            </button>



            <button
              onClick={viewProfile}
              className="
              flex items-center gap-1
              bg-white/10
              text-white
              px-2 py-1.5
              rounded-lg
              text-xs
              hover:bg-white/20
              transition-all
              duration-300
            "
            >
              <FaUser size={12} />
              Profile
            </button>

            <button
              onClick={viewWishlist}
              className="
                flex items-center gap-1
                bg-white/10
                text-white
                px-2 py-1.5
                rounded-lg
                text-xs
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              <FaHeart size={12} />
              Wishlist
            </button>

            <button
              onClick={logoutUser}
              className="
              flex items-center gap-1
              bg-red-500
              text-white
              px-2 py-1.5
              rounded-lg
              text-xs
              hover:bg-red-600
              transition-all
              duration-300
            "
            >
              <FaSignOutAlt size={12} />
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
