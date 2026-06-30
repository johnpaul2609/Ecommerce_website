
import {
  FaEdit,
  FaTrash,
  FaBoxOpen,
} from "react-icons/fa";

function AdminProducts({
  products,
  deleteProduct,
  editProduct,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <FaBoxOpen />
            Manage Products
          </h2>

          <p className="text-slate-500 mt-1">
            Total Products: {products.length}
          </p>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="bg-slate-100 text-slate-700">

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {products.map((product) => (
              <tr
                key={product.id}
                className="
                  border-b
                  hover:bg-slate-50
                  transition-all
                "
              >

                <td className="p-4 font-medium text-slate-800">
                  {product.name}
                </td>

                <td className="p-4 text-blue-600 font-bold">
                  ₹{product.price}
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        product.stock_quantity > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {product.stock_quantity}
                  </span>

                </td>

                <td className="p-4">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        editProduct(product)
                      }
                      className="
                        flex items-center gap-2
                        px-4 py-2
                        bg-yellow-500
                        text-white
                        rounded-lg
                        hover:bg-yellow-600
                        transition-all
                      "
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                      className="
                        flex items-center gap-2
                        px-4 py-2
                        bg-red-500
                        text-white
                        rounded-lg
                        hover:bg-red-600
                        transition-all
                      "
                    >
                      <FaTrash />
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminProducts;
