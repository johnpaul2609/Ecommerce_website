import {
  FaShoppingBag,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

function AdminOrders({ orders, loadAdminOrders }) {
  const updateOrderStatus = async (
    orderId,
    status
  ) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(
        `http://127.0.0.1:8000/admin/orders/${orderId}/status?status=${status}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadAdminOrders();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      {/* Header */}
      <div className="mb-8">

        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <FaShoppingBag />
          Manage Orders
        </h2>

        <p className="text-slate-500 mt-2">
          Total Orders: {orders.length}
        </p>

      </div>

      {orders.length === 0 ? (
        <div className="text-center py-10">

          <h3 className="text-2xl font-bold text-slate-600">
            No Orders Found
          </h3>

        </div>
      ) : (
        <div className="space-y-6">

          {Array.isArray(orders) &&
            orders.map((order) => (
              <div
                key={order.order_id}
                className="
                border
                border-slate-200
                rounded-2xl
                p-6
                shadow-sm
                hover:shadow-lg
                transition-all
              "
              >

                {/* Order Header */}
                <div className="flex justify-between items-center flex-wrap gap-4 mb-6">

                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      Order #{order.order_id}
                    </h3>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(
                        order.order_id,
                        e.target.value
                      )
                    }
                    className="
    border
    border-slate-300
    rounded-lg
    px-4
    py-2
    font-semibold
  "
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>
                  </select>

                </div>

                {/* Customer Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">

                  <div className="flex items-center gap-3">
                    <FaUser className="text-slate-500" />

                    <span className="text-slate-700">
                      {order.customer}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-slate-500" />

                    <span className="text-slate-700">
                      {order.customer_email}
                    </span>
                  </div>

                </div>

                {/* Order Items */}
                <div className="bg-slate-50 rounded-xl p-4">

                  <h4 className="font-bold text-lg mb-4 text-slate-800">
                    Order Items
                  </h4>

                  <div className="space-y-3">

                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="
                        flex
                        justify-between
                        border-b
                        pb-2
                        text-slate-700
                      "
                      >
                        <span>
                          {item.product_name}
                        </span>

                        <span>
                          Qty: {item.quantity}
                          {" | "}
                          ₹{item.price}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>

                {/* Total */}
                <div className="flex justify-end mt-6">

                  <div
                    className="
                    bg-blue-50
                    border
                    border-blue-200
                    px-6
                    py-3
                    rounded-xl
                  "
                  >
                    <h3 className="text-xl font-bold text-blue-700">
                      Total: ₹{order.total_amount}
                    </h3>
                  </div>

                </div>

              </div>
            ))}

        </div>
      )}

    </div>
  );
}

export default AdminOrders;
