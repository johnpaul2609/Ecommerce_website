function Wishlist({ wishlistItems, removeFromWishlist }) {
  console.log("Wishlist items received:", wishlistItems);
  
  if (!wishlistItems) {
    return <div className="p-6">Loading...</div>;
  }

  // Ensure it's an array before checking length
  const items = Array.isArray(wishlistItems) ? wishlistItems : [];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        My Wishlist ❤️
      </h2>

      {items.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.wishlist_id}
              className="bg-white shadow-lg rounded-lg p-4 relative"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-48 object-cover rounded"
              />

              <h3 className="font-bold mt-3">
                {item.name}
              </h3>

              <p className="text-green-600 font-semibold">
                ₹{item.price}
              </p>
              
              <button
                onClick={() => removeFromWishlist(item.wishlist_id)}
                className="absolute top-2 right-2 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;