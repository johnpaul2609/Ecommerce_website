function OrderHistory({ orders }) {
  const downloadInvoice = (orderId) => {
    const token = localStorage.getItem("token");

    fetch(
      `https://ecommerce-website-7rjn.onrender.com/invoice/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice_${orderId}.pdf`;

        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };
  return (
    <div className="min-h-screen bg-slate-100 px-3 py-6 md:p-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          📦 My Orders
        </h1>

        <p className="text-slate-500 mt-2">
          Track and view your previous purchases
        </p>
      </div>

      {/* No Orders */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">

          <h2 className="text-3xl font-bold text-slate-600">
            No Orders Found 😔
          </h2>

          <p className="text-slate-500 mt-2">
            Start shopping and place your first order.
          </p>

        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-8">

          {orders.map((order) => (
            <div
              key={order.id}
              className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
                border
                border-slate-200
              "
            >

              {/* Order Header */}
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Order #{order.id}
                  </h2>

                  <p className="text-slate-500">
                    Thank you for your purchase
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    Ordered On:
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString()
                      : "N/A"}
                  </p>

                  <p className="text-sm font-semibold text-blue-600">
                    Status: {order.status}
                  </p>
                </div>

                <span
                  className={`
                    px-4 py-2 rounded-full font-semibold
                          ${order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }
                      `}
                >
                  {order.status}
                </span>

              </div>

              {/* Products */}
              <div className="space-y-4">

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      justify-between
                      items-center
                      border-b
                      pb-4
                      flex-wrap
                      gap-4
                    "
                  >

                    <div>
                      <h3 className="font-bold text-lg text-slate-800">
                        {item.product_name}
                      </h3>

                      <p className="text-slate-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">

                      <p className="text-slate-600">
                        Price: ₹{item.price}
                      </p>

                      <p className="font-semibold text-slate-800">
                        Subtotal: ₹
                        {item.price * item.quantity}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              {/* Total */}
              {/* Total + Invoice */}
              <div className="mt-6 flex flex-wrap justify-between items-center gap-4">

                <button
                  onClick={() => downloadInvoice(order.id)}
                  className="
                    bg-purple-600
                    hover:bg-purple-700
                    text-white
                    px-5
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                  "
                              >
                  Download Invoice
                </button>

                <div
                  className="
                  bg-blue-50
                  border
                  border-blue-200
                  rounded-xl
                  px-6
                  py-4
                "
                >
                  <h3 className="text-xl font-bold text-blue-700">
                    Total Amount: ₹{order.total_amount}
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

export default OrderHistory;
