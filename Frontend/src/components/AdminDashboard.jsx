import { useState, useEffect } from "react";
import {
  FaBox,
  FaImage,
  FaTag,
  FaWarehouse,
  FaRupeeSign,
} from "react-icons/fa";

function AdminDashboard({
  onAddProduct,
  editingProduct,
  onUpdateProduct,
}) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    image_url: "",
    category: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setProduct({
        name: editingProduct.name || "",
        description:
          editingProduct.description || "",
        price: editingProduct.price || "",
        stock_quantity:
          editingProduct.stock_quantity || "",
        image_url:
          editingProduct.image_url || "",
        category:
          editingProduct.category || "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      onUpdateProduct(
        editingProduct.id,
        product
      );
    } else {
      onAddProduct(product);
    }

    setProduct({
      name: "",
      description: "",
      price: "",
      stock_quantity: "",
      image_url: "",
      category: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

      {/* Header */}
      <div className="mb-8">

        <h2 className="text-3xl font-bold text-slate-800">
          {editingProduct
            ? "✏️ Edit Product"
            : "➕ Add Product"}
        </h2>

        <p className="text-slate-500 mt-2">
          Manage your store products
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6"
      >

        {/* Product Name */}
        <div>
          <label className="block mb-2 font-medium">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="
              w-full
              p-3
              border
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">
            Category
          </label>

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="
              w-full
              p-3
              border
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          >
            <option value="">
              Select Category
            </option>

            <option value="Mobile">
              Mobile
            </option>

            <option value="Laptop">
              Laptop
            </option>

            <option value="airpods">
              Airpods
            </option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="
              w-full
              p-3
              border
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-2 font-medium">
            Stock Quantity
          </label>

          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
            onChange={handleChange}
            placeholder="Available stock"
            className="
              w-full
              p-3
              border
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">
            Product Image URL
          </label>

          <input
            type="text"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="
              w-full
              p-3
              border
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter product description"
            className="
              w-full
              p-3
              border
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">

          <button
            type="submit"
            className="
              w-full
              py-4
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
              font-bold
              hover:scale-[1.02]
              transition-all
            "
          >
            {editingProduct
              ? "Update Product"
              : "Add Product"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AdminDashboard;
