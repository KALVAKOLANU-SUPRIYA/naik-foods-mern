import { useEffect, useState } from "react";
import "./style.css";



import jowarKhakhra from "./assets/jowar-palak-khakhra.png";
import bajraKhakhra from "./assets/bajra-methi-khakhra.png";
import beetrootChips from "./assets/beetroot-chips.png";
import mangoPickle from "./assets/mango-pickle.png";
import lemonPickle from "./assets/lemon-pickle.png";
import besanLadoo from "./assets/besan-ladoo.png";
import kajuKatli from "./assets/kaju-katli.png";
import maharashtrianMasala from "./assets/maharashtrian-masala.png";

const API_URL = "http://localhost:5000/api/products";
const FREE_DELIVERY_LIMIT = 999;

function App() {
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(500);

  // Cart now stores complete product objects
  const [cart, setCart] = useState([]);

  const productImages = {
  "Jowar Palak Khakhra": jowarKhakhra,
  "Bajra Methi Khakhra": bajraKhakhra,
  "Beetroot Chips": beetrootChips,
  "Mango Pickle": mangoPickle,
  "Lemon Pickle": lemonPickle,
  "Besan Ladoo": besanLadoo,
  "Kaju Katli": kajuKatli,
  "Maharashtrian Masala": maharashtrianMasala,
};

 useEffect(() => {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.append("search", search);
  }

  if (category !== "All") {
    params.append("category", category);
  }

  params.append("maxPrice", maxPrice);

  if (sort !== "default") {
    params.append("sort", sort);
  }

  setLoading(true);
  setError("");

  fetch(`${API_URL}?${params.toString()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    })
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      setError("Unable to load products. Please try again.");
      setLoading(false);
    });
}, [search, category, maxPrice, sort]);
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

 const filteredProducts = products;
  // Add product to cart
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== id)
    );
  };

  // Total number of items
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Cart subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Free delivery calculations
  const remainingForFreeDelivery = Math.max(
    FREE_DELIVERY_LIMIT - subtotal,
    0
  );

  const deliveryProgress = Math.min(
    (subtotal / FREE_DELIVERY_LIMIT) * 100,
    100
  );

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          NAIK<span>FOODS</span>
        </div>

        <div className="cart">
          🛒 Cart ({cartCount})
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <p className="eyebrow">
            AUTHENTIC • TRADITIONAL • DELICIOUS
          </p>

          <h1>
            Discover Your
            <br />
            Favourite Foods
          </h1>

          <p className="hero-text">
            Find authentic Indian flavours quickly with smart
            search and filters.
          </p>

          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

        </div>
      </section>

      {/* MAIN */}
      <main className="main-container">

        {/* FILTERS */}
        <aside className="filters">

          <h2>Filters</h2>

          <div className="filter-section">

            <h3>Category</h3>

            {categories.map((item) => (
              <button
                key={item}
                className={`category-button ${
                  category === item ? "active" : ""
                }`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}

          </div>

          <div className="filter-section">

            <div className="filter-title">
              <h3>Maximum Price</h3>
              <span>₹{maxPrice}</span>
            </div>

            <input
              className="price-range"
              type="range"
              min="0"
              max="500"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
            />

            <div className="price-labels">
              <span>₹0</span>
              <span>₹500</span>
            </div>

          </div>

          <div className="filter-section">

            <h3>Sort By</h3>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Recommended</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
              <option value="rating">
                Highest Rated
              </option>
            </select>

          </div>

        </aside>

        {/* PRODUCTS */}
        <section className="products-section">

          <div className="products-header">

            <div>
              <h2>Our Products</h2>
              <p>Carefully selected for you</p>
            </div>

            <span className="product-count">
              {filteredProducts.length} products
            </span>

          </div>

          

                {loading ? (
  <div className="no-products">
    <div className="empty-icon">⏳</div>
    <h3>Loading products...</h3>
    <p>Please wait while we fetch the latest products.</p>
  </div>
) : error ? (
  <div className="no-products">
    <div className="empty-icon">⚠️</div>
    <h3>Something went wrong</h3>
    <p>{error}</p>

    <button
      className="retry-button"
      onClick={() => window.location.reload()}
    >
      Try Again
    </button>
  </div>
) : filteredProducts.length === 0 ? (
  <div className="no-products">
    <div className="empty-icon">🔎</div>
    <h3>No products found</h3>
    <p>Try changing your search or filters.</p>
  </div>
) : (
  <div className="product-grid">
    {filteredProducts.map((product) => (
      <article
        className="product-card"
        key={product._id}
      >
        <div className="product-image">
          <img
            src={productImages[product.name] || product.image}
            alt={product.name}
          />
        </div>

        <div className="product-info">
          <span className="category">
            {product.category}
          </span>

          <h3>{product.name}</h3>

          <p className="description">
            {product.description}
          </p>

          <div className="rating">
            ⭐ {product.rating}
          </div>

          <div className="product-bottom">
            <strong>₹{product.price}</strong>

            <button
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    ))}
  </div>
)}

        </section>

      </main>

      {/* CART SECTION */}
      <section className="cart-section">

        <div className="cart-container">

          <div className="cart-heading">
            <div>
              <p className="eyebrow">YOUR ORDER</p>
              <h2>Shopping Cart</h2>
            </div>

            <span>
              {cartCount} item{cartCount !== 1 ? "s" : ""}
            </span>
          </div>

          {/* FREE DELIVERY PROGRESS */}
          <div className="delivery-box">

            {subtotal >= FREE_DELIVERY_LIMIT ? (

              <p className="delivery-success">
                🎉 Congratulations! You unlocked FREE DELIVERY.
              </p>

            ) : (

              <p>
                Add <strong>₹{remainingForFreeDelivery}</strong> more
                to unlock FREE DELIVERY.
              </p>

            )}

            <div className="progress-background">

              <div
                className="progress-fill"
                style={{
                  width: `${deliveryProgress}%`,
                }}
              />

            </div>

            <div className="progress-labels">
              <span>₹0</span>
              <span>₹999</span>
            </div>

          </div>

          {cart.length === 0 ? (

            <div className="empty-cart">

              <div className="empty-cart-icon">
                🛒
              </div>

              <h3>Your cart is empty</h3>

              <p>
                Add some delicious products to get started.
              </p>

            </div>

          ) : (

            <div className="cart-content">

              {/* CART ITEMS */}
              <div className="cart-items">

                {cart.map((item) => (

                  <div
                    className="cart-item"
                    key={item._id}
                  >

                    <div className="cart-item-image">
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    <div className="cart-item-info">

                      <span>
                        {item.category}
                      </span>

                      <h3>{item.name}</h3>

                      <strong>
                        ₹{item.price}
                      </strong>

                    </div>

                    <div className="quantity-controls">

                      <button
                        onClick={() =>
                          decreaseQuantity(item._id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item._id)
                        }
                      >
                        +
                      </button>

                    </div>

                    <div className="item-total">
                      ₹{item.price * item.quantity}
                    </div>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                ))}

              </div>

              {/* ORDER SUMMARY */}
              <div className="order-summary">

                <h3>Order Summary</h3>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <strong>₹{subtotal}</strong>
                </div>

                <div className="summary-row">
                  <span>Delivery</span>

                  <strong>
                    {subtotal >= FREE_DELIVERY_LIMIT
                      ? "FREE"
                      : "Calculated at checkout"}
                  </strong>
                </div>

                <div className="summary-divider" />

                <div className="summary-total">
                  <span>Total</span>
                  <strong>₹{subtotal}</strong>
                </div>

                <button className="checkout-button">
                  Proceed to Checkout
                </button>

              </div>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default App;