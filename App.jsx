import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * ============================================================================
 * DigiSkills 3.0 Batch-04: Full Stack Web Development
 * Hands-on Exercise No. 2
 * Combined Solution: Task 1 (JS Logic & Invoice) + Task 2 (React Product Catalog)
 * ============================================================================
 */

// 1. Given Product Dataset
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 85000, stock: 5 },
  { id: 2, name: "Mouse", category: "Accessories", price: 1500, stock: 0 },
  { id: 3, name: "Keyboard", category: "Accessories", price: 3500, stock: 10 },
  { id: 4, name: "Monitor", category: "Electronics", price: 25000, stock: 3 },
  { id: 5, name: "USB Cable", category: "Accessories", price: 700, stock: 15 }
];

// ============================================================================
// PART 1: JAVASCRIPT LOGIC (QUESTION 1)
// ============================================================================

/**
 * 1. Filter and display available products whose stock > 0
 * @param {Array} items - Product list
 * @returns {Array} Filtered list of in-stock products
 */
export function filterAvailableProducts(items) {
  console.log("========================================================");
  console.log("       TASK 1: AVAILABLE PRODUCTS (STOCK > 0)          ");
  console.log("========================================================");

  // Filter products where stock is strictly greater than 0
  const availableItems = items.filter((product) => product.stock > 0);

  // Display available products in console
  console.table(availableItems);
  console.log(`Total available products: ${availableItems.length} out of ${items.length}`);
  console.log("(Note: 'Mouse' was filtered out because stock is 0)\n");

  return availableItems;
}

/**
 * 2. Calculate subtotal, apply 10% discount if subtotal > Rs. 50,000, and compute final total
 * @param {Array} orderItems - Array of items in the order
 * @returns {Object} Calculated summary object
 */
export function calculateOrder(orderItems) {
  // Calculate subtotal using Array.prototype.reduce()
  const subtotal = orderItems.reduce((sum, item) => {
    const qty = item.quantity || 1;
    return sum + item.price * qty;
  }, 0);

  const DISCOUNT_THRESHOLD = 50000;
  const DISCOUNT_RATE = 0.10; // 10% discount

  let discountAmount = 0;
  let isDiscountApplied = false;

  // Check discount eligibility
  if (subtotal > DISCOUNT_THRESHOLD) {
    discountAmount = subtotal * DISCOUNT_RATE;
    isDiscountApplied = true;
  }

  const finalTotal = subtotal - discountAmount;

  return {
    items: orderItems,
    subtotal,
    isDiscountApplied,
    discountPercent: isDiscountApplied ? 10 : 0,
    discountAmount,
    finalTotal
  };
}

/**
 * 3. Print clean, formatted invoice/order summary in the console
 * @param {Object} summary - Order summary calculated by calculateOrder
 */
export function printInvoice(summary) {
  const line = "-".repeat(50);
  const doubleLine = "=".repeat(50);

  console.log(doubleLine);
  console.log("              DIGISKILLS TECH STORE               ");
  console.log("             ORDER INVOICE / SUMMARY              ");
  console.log(doubleLine);
  console.log(
    "Item".padEnd(16) +
    "Qty".padEnd(8) +
    "Unit Price".padEnd(14) +
    "Total (Rs.)".padStart(12)
  );
  console.log(line);

  summary.items.forEach((item) => {
    const qty = item.quantity || 1;
    const itemTotal = item.price * qty;
    console.log(
      item.name.padEnd(16) +
      String(qty).padEnd(8) +
      `Rs. ${item.price.toLocaleString()}`.padEnd(14) +
      `Rs. ${itemTotal.toLocaleString()}`.padStart(12)
    );
  });

  console.log(line);
  console.log(`Subtotal:`.padEnd(36) + `Rs. ${summary.subtotal.toLocaleString()}`.padStart(14));

  if (summary.isDiscountApplied) {
    console.log(
      `Discount (${summary.discountPercent}% on orders > Rs. 50k):`.padEnd(36) +
      `- Rs. ${summary.discountAmount.toLocaleString()}`.padStart(14)
    );
  } else {
    console.log(
      `Discount (0% - Not eligible):`.padEnd(36) +
      `Rs. 0`.padStart(14)
    );
  }

  console.log(doubleLine);
  console.log(`FINAL TOTAL PAYABLE:`.padEnd(36) + `Rs. ${summary.finalTotal.toLocaleString()}`.padStart(14));
  console.log(doubleLine);
  console.log("        Thank you for shopping with us!           \n");
}

// ============================================================================
// PART 2: REACTJS PRODUCT CATALOG UI (QUESTION 2)
// ============================================================================

/**
 * Reusable ProductCard Component
 * Accepts product props and onAddToCart callback.
 * Disables button and marks status for out-of-stock products (stock === 0).
 */
export function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.stock === 0;

  return (
    <div className={`product-card ${isOutOfStock ? "out-of-stock" : ""}`}>
      <div className="card-top">
        <span className="category-badge">{product.category}</span>
        <span className={`stock-badge ${isOutOfStock ? "out-stock" : "in-stock"}`}>
          {isOutOfStock ? "Out of Stock" : `In Stock (${product.stock})`}
        </span>
      </div>

      <div className="card-body">
        <h3 className="product-title">{product.name}</h3>
        <div className="price-tag">
          <span className="price-currency">Rs.</span>
          <span className="price-number">{product.price.toLocaleString()}</span>
        </div>
      </div>

      <button
        className="btn-add-to-cart"
        onClick={() => onAddToCart(product)}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? "⚠️ Out of Stock" : "🛒 Add to Cart"}
      </button>
    </div>
  );
}

/**
 * Main App Component
 * Combines Task 1 logic and Task 2 Product Catalog UI.
 */
export default function App() {
  // useState hook to manage cart items count
  const [cartCount, setCartCount] = useState(0);
  const [consoleNotice, setConsoleNotice] = useState("");

  // Handler to increase cart count when Add to Cart is clicked
  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      setCartCount((prev) => prev + 1);
      setConsoleNotice(`Added "${product.name}" to cart! Cart items: ${cartCount + 1}`);
    }
  };

  // Handler to reset cart count
  const handleResetCart = () => {
    setCartCount(0);
    setConsoleNotice("Cart has been reset.");
  };

  // Run Task 1 functions automatically on initial component mount
  useEffect(() => {
    console.log("%c--- DigiSkills Exercise 2: Auto-Executing JS Logic ---", "color: #2563eb; font-weight: bold; font-size: 14px;");
    
    // 1. Filter available products
    filterAvailableProducts(products);

    // 2. Sample Order exceeding Rs. 50,000 (Qualifies for 10% discount)
    console.log(">>> Scenario 1: Order > Rs. 50,000 (1x Laptop + 1x Monitor)");
    const qualifyingOrder = [
      { name: "Laptop", price: 85000, quantity: 1 },
      { name: "Monitor", price: 25000, quantity: 1 }
    ];
    const summary1 = calculateOrder(qualifyingOrder);
    printInvoice(summary1);

    // 3. Sample Order under Rs. 50,000 (No discount)
    console.log(">>> Scenario 2: Order <= Rs. 50,000 (1x Keyboard + 2x USB Cable)");
    const standardOrder = [
      { name: "Keyboard", price: 3500, quantity: 1 },
      { name: "USB Cable", price: 700, quantity: 2 }
    ];
    const summary2 = calculateOrder(standardOrder);
    printInvoice(summary2);
  }, []);

  // UI trigger to re-run Task 1 filter in console
  const handleRunFilterConsole = () => {
    filterAvailableProducts(products);
    setConsoleNotice("Task 1: Filtered available products logged to console! Press F12 to inspect.");
  };

  // UI trigger to re-run Task 1 invoice calculation in console
  const handleRunInvoiceConsole = () => {
    const sampleOrder = [
      { name: "Laptop", price: 85000, quantity: 1 },
      { name: "Monitor", price: 25000, quantity: 1 }
    ];
    const summary = calculateOrder(sampleOrder);
    printInvoice(summary);
    setConsoleNotice("Task 1: Order calculation & invoice logged to console! Press F12 to inspect.");
  };

  return (
    <div className="app-container">
      {/* Header Banner */}
      <header className="app-header">
        <div className="header-brand">
          <h1>DigiSkills 3.0 (Batch-04) Full Stack Development</h1>
          <p>Hands-on Exercise No. 2: JavaScript Logic &amp; ReactJS Product Catalog</p>
        </div>

        {/* Cart Counter State Badge */}
        <div className="cart-widget">
          <div className="cart-counter-pill">
            <span className="cart-icon">🛒</span>
            <span className="cart-label">Cart Items:</span>
            <span className="cart-badge-number">{cartCount}</span>
          </div>
          {cartCount > 0 && (
            <button className="btn-reset" onClick={handleResetCart}>
              Reset
            </button>
          )}
        </div>
      </header>

      {/* Task 1 Quick Console Trigger Bar */}
      <section className="task1-toolbar">
        <div className="toolbar-info">
          <span className="task-pill">Task 1: JavaScript Logic</span>
          <span>Open browser console (<strong>F12</strong>) to see filtered products and formatted invoices.</span>
        </div>
        <div className="toolbar-actions">
          <button className="btn-toolbar" onClick={handleRunFilterConsole}>
            🔍 Run Filter (Stock &gt; 0)
          </button>
          <button className="btn-toolbar" onClick={handleRunInvoiceConsole}>
            🧾 Generate Invoice (10% Discount)
          </button>
        </div>
      </section>

      {/* Notice Banner */}
      {consoleNotice && <div className="notice-banner">{consoleNotice}</div>}

      {/* Task 2: Responsive Product Grid rendering with .map() */}
      <section className="catalog-section">
        <div className="section-header">
          <h2>Product Catalog</h2>
          <span className="items-count-tag">{products.length} Products Available</span>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Exercise Footer */}
      <footer className="app-footer">
        <p>DigiSkills 3.0 Batch-04 &bull; Full Stack Web Development Hands-on Exercise No. 2 Solution</p>
      </footer>
    </div>
  );
}
