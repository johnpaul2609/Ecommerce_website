import { useState, useEffect } from "react";
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import ProductList from "./components/ProductList";
import Profile from "./components/Profile";

import Cart from "./components/Cart"
import OrderHistory from "./components/OrderHistory"
import AdminDashboard from "./components/AdminDashboard";
import AdminProducts from "./components/AdminProducts";
import AdminOrders from "./components/AdminOrders";
import ForgotPassword from "./components/ForgotPassword";
import Wishlist from "./components/Wishlist";
import ProductDetails from "./components/ProductDetails";
import { Routes, Route } from "react-router-dom";

// Detect if we are running locally
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

// Set API URL based on environment
const API = "https://ecommerce-website-7rjn.onrender.com";

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  )
  const [showRegister, setShowRegister] = useState(false)
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [orders, setOrders] = useState([])
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [stats, setStats] = useState({
    total_users: 0,
    total_products: 0,
    total_orders: 0,
    total_revenue: 0
  })
  const [showProfile, setShowProfile] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showOrders, setShowOrders] = useState(false)
  const [paymentMethod, setPaymentMethod] =
    useState("COD");
  const totalAmount = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) =>
          total + (item.price * item.quantity),
        0
      )
    : 0;

  const [showProducts, setShowProducts] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [editingProduct, setEditingProduct] =
    useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      loadProducts();
      refreshWishlistSilently(); // Load wishlist immediately

      if (
        localStorage.getItem("is_admin") === "true"
      ) {
        loadAdminStats();
        loadAdminOrders();
      }
    }
  }, []);

  useEffect(() => {
    const checkTokenExpiry = () => {

      const exp =
        localStorage.getItem("token_exp");

      if (!exp) return;

      const currentTime = Math.floor(
        Date.now() / 1000
      );

      if (currentTime >= Number(exp)) {

        alert(
          "Session expired. Please login again."
        );

        localStorage.clear();

        setIsLoggedIn(false);

        window.location.reload();
      }
    };

    checkTokenExpiry();

    const interval = setInterval(
      checkTokenExpiry,
      60000
    );

    return () => clearInterval(interval);
  }, []);

  const isAdmin =
    localStorage.getItem("is_admin") === "true";

  const handleUnauthorized = () => {
    alert("Session expired. Please login again.");

    localStorage.clear();

    setIsLoggedIn(false);
    setProducts([]);
    setCartItems([]);
    setOrders([]);
    setWishlistItems([]);

    window.location.reload();
  };

  const loginUser = () => {

    const formData = new FormData()

    formData.append("username", email)
    formData.append("password", password)

    fetch(`${API}/login`, {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {

        console.log("Login response:", data)

        if (data.access_token) {
          console.log("Token received:", data.access_token);
          localStorage.setItem(
            "token",
            data.access_token
          )
          const payload = JSON.parse(
            atob(data.access_token.split(".")[1])
          );

          localStorage.setItem(
            "token_exp",
            payload.exp
          );
          console.log("Token stored in localStorage:", localStorage.getItem("token"));

          localStorage.setItem(
            "is_admin",
            data.is_admin
          )
          if (data.is_admin) {
            loadAdminOrders();
            loadAdminStats();
          }

          loadProducts()

          setShowProducts(true)

          setIsLoggedIn(true)

          alert("Login Successful")


        } else {

          alert(data.message)

        }

      })
  }
  const loadProducts = () => {

    fetch(`${API}/products`)
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2))
        setProducts(data)
      })

  }
  const addProduct = async (product) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...product,
            price: Number(product.price),
            stock_quantity: Number(product.stock_quantity)
          })
        }
      );

      if (response.ok) {
        alert("Product Added Successfully");

        loadProducts(); // refresh products
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadAdminOrders = () => {

    const token = localStorage.getItem("token");

    fetch(`${API}/admin/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
  };
  const loadAdminStats = () => {

    const token = localStorage.getItem("token");

    fetch(`${API}/admin/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      });
  };

  const addToCart = (productId) => {

    const token = localStorage.getItem("token")

    fetch(`${API}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: 1
      })
    })
      .then((response) => {
        if (response.status === 401) {
          handleUnauthorized();
          return null;
        }

        return response.json();
      })
      .then((data) => {
        if (!data) return;

        alert(data.message);
      });
  }

  const viewCart = () => {
    const token = localStorage.getItem("token");

    fetch(`${API}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          handleUnauthorized();
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) return;
        setCartItems(data);

        setShowProducts(false);
        setShowOrders(false);
        setShowProfile(false);
        setShowWishlist(false);
      });
  };
  const addToWishlist = (productId) => {
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token);

    fetch(`${API}/wishlist/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: productId }),
    })
      .then((response) => {
        if (response.status === 401) {
          handleUnauthorized();
          return null;
        }

        return response.json();
      })
      .then((data) => {
        if (!data) return;

        refreshWishlistSilently();
      });
  };
  const removeFromWishlist = (wishlistId) => {
    const token = localStorage.getItem("token");

    fetch(`${API}/wishlist/${wishlistId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          handleUnauthorized();
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) return;
        // Instead of calling viewWishlist, just refresh the list silently
        refreshWishlistSilently();
      });
  };

  const refreshWishlistSilently = () => {
    const token = localStorage.getItem("token");

    fetch(`${API}/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {

        if (response.status === 401) {
          handleUnauthorized();
          return null;
        }

        return response.json();
      })
      .then((data) => {

        if (!data) return;

        if (Array.isArray(data)) {
          setWishlistItems(data);
        } else {
          setWishlistItems([]);
        }
      });
  };

  const viewWishlist = () => {
    // Already have wishlistItems in state, just show it
    setShowWishlist(true);
    setShowProducts(false);
    setShowOrders(false);
    setShowProfile(false);
  };

  const toggleWishlist = () => {
    setShowWishlist(!showWishlist);
    setShowProfile(false);
    setShowOrders(false);
    setShowProducts(false);
  };
  const viewProfile = () => {
    setShowProfile(true);
    setShowProducts(false);
    setShowOrders(false);
    setShowWishlist(false);
  };

  const viewOrders = () => {

    const token = localStorage.getItem("token");

    fetch(`${API}/orders`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 401) {
          handleUnauthorized();
          return null;
        }

        return response.json();
      })
      .then((data) => {
        if (!data) return;

        setOrders(data);

        setShowOrders(true);
        setShowProducts(false);
        setShowProfile(false);
        setShowWishlist(false);
      });
  };
  const updateQuantity = (cartId, action) => {


    const token = localStorage.getItem("token")

    fetch(
      `${API}/cart/${cartId}?action=${action}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        if (response.status === 401) {
          handleUnauthorized();
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) return;
        console.log(data)
        viewCart()
      })
  }

  const removeFromCart = (cartId) => {

    const token = localStorage.getItem("token")

    fetch(`${API}/cart/${cartId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 401) {
          handleUnauthorized();
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) return;
        alert(data.message)

        viewCart()
      })
  }
  const placeOrder = () => {
    if (paymentMethod === "ONLINE") {
      fetch(
        `${API}/create-payment?amount=${totalAmount}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((order) => {
          const options = {
            key: "rzp_test_T7wCONwF2gjBP2",

            amount: order.amount,

            currency: order.currency,

            name: "John Ecommerce Store",

            description: "Order Payment",

            order_id: order.id,

            handler: function (response) {
              alert("Payment Successful!");

              placeOrderAfterPayment();
            },
          };

          const rzp = new window.Razorpay(options);

          rzp.open();
        });

      return;
    }

    const token = localStorage.getItem("token");

    fetch(`${API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        payment_method: paymentMethod,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          handleUnauthorized();
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) return;

        console.log(data);

        alert(data.message);

        setCartItems([]);

        loadProducts();

        setShowProducts(true);
      });
  };

  const placeOrderAfterPayment = () => {
    const token = localStorage.getItem("token");

    fetch(`${API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        payment_method: "ONLINE",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);

        setCartItems([]);

        loadProducts();

        setShowProducts(true);
      });
  };
  const logoutUser = () => {
    localStorage.clear();

    setEmail("");
    setPassword("");

    setIsLoggedIn(false);

    setProducts([]);
    setCartItems([]);
    setOrders([]);

    setShowOrders(false);
    setShowProducts(true);

    alert("Logged Out Successfully");
  };
  const deleteProduct = async (productId) => {

    const token = localStorage.getItem("token")

    const response = await fetch(
      `${API}/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    alert(data.message)

    loadProducts()
  }

  const updateProduct = async (
    productId,
    updatedProduct
  ) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API}/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct)
      }
    );

    const data = await response.json();

    alert(data.message);

    setEditingProduct(null);

    loadProducts();
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div style={{ padding: "20px" }}>
            {!isLoggedIn ? (
              showRegister ? (
                <Register
                  setShowRegister={setShowRegister}
                />
              ) : (
                showForgotPassword ? (
                  <ForgotPassword
                    setShowForgotPassword={
                      setShowForgotPassword
                    }
                  />
                ) : showRegister ? (
                  <Register
                    setShowRegister={setShowRegister}
                  />
                ) : (
                  <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    loginUser={loginUser}
                    setShowRegister={setShowRegister}
                    setShowForgotPassword={
                      setShowForgotPassword
                    }
                  />
                )
              )
            ) : (
              <div>
                <Navbar
                  loadProducts={() => {
                    loadProducts();
                    setShowProducts(true);
                    setShowOrders(false);
                    setShowProfile(false);
                    setShowWishlist(false);
                  }}
                  viewCart={viewCart}
                  viewOrders={viewOrders}
                  viewWishlist={viewWishlist}
                  viewProfile={viewProfile}
                  logoutUser={logoutUser}
                />

                {isAdmin && (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                        <h3 className="text-slate-500">
                          Users
                        </h3>

                        <h2 className="text-4xl font-bold text-blue-600">
                          {stats.total_users}
                        </h2>
                      </div>

                      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                        <h3 className="text-slate-500">
                          Products
                        </h3>

                        <h2 className="text-4xl font-bold text-green-600">
                          {stats.total_products}
                        </h2>
                      </div>

                      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                        <h3 className="text-slate-500">
                          Orders
                        </h3>

                        <h2 className="text-4xl font-bold text-purple-600">
                          {stats.total_orders}
                        </h2>
                      </div>

                      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                        <h3 className="text-slate-500">
                          Revenue
                        </h3>

                        <h2 className="text-4xl font-bold text-orange-600">
                          ₹{stats.total_revenue}
                        </h2>
                      </div>
                    </div>
                    <AdminDashboard
                      onAddProduct={addProduct}
                      editingProduct={editingProduct}
                      onUpdateProduct={updateProduct}
                    />

                    <AdminProducts
                      products={products}
                      deleteProduct={deleteProduct}
                      editProduct={setEditingProduct}
                    />

                    <AdminOrders
                      orders={orders}
                      loadAdminOrders={loadAdminOrders}
                    />
                  </>
                )}

                {!isAdmin && (
                  <>
                    {showProfile ? (
                      <Profile />
                    ) : showWishlist ? (
                      <Wishlist
                        wishlistItems={wishlistItems}
                        removeFromWishlist={
                          removeFromWishlist
                        }
                      />
                    ) : showOrders ? (
                      <OrderHistory orders={orders} />
                    ) : showProducts ? (
                      <ProductList
                        products={products}
                        addToCart={addToCart}
                        addToWishlist={addToWishlist}
                        removeFromWishlist={
                          removeFromWishlist
                        }
                        wishlistItems={wishlistItems}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCategory={
                          selectedCategory
                        }
                        setSelectedCategory={
                          setSelectedCategory
                        }
                      />
                    ) : (
                      <Cart
                        cartItems={cartItems}
                        totalAmount={totalAmount}
                        updateQuantity={
                          updateQuantity
                        }
                        removeFromCart={
                          removeFromCart
                        }
                        placeOrder={placeOrder}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={
                          setPaymentMethod
                        }
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProductDetails
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            wishlistItems={wishlistItems}
          />
        }
      />
    </Routes>
  );
}

export default App