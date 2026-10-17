/**
 * ============================================================================
 * DigiSkills 3.0 Batch-04: Full Stack Web Development
 * Hands-on Exercise No. 2 - Task 1: JavaScript Product Order Calculator
 * ============================================================================
 */

// Given array of products
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 85000, stock: 5 },
  { id: 2, name: "Mouse", category: "Accessories", price: 1500, stock: 0 },
  { id: 3, name: "Keyboard", category: "Accessories", price: 3500, stock: 10 },
  { id: 4, name: "Monitor", category: "Electronics", price: 25000, stock: 3 },
  { id: 5, name: "USB Cable", category: "Accessories", price: 700, stock: 15 }
];

/**
 * 1. Filter and display only available products (stock > 0)
 * @param {Array} items - List of products to filter
 * @returns {Array} List of in-stock products
 */
function getAvailableProducts(items) {
  console.log("====================================================");
  console.log("          AVAILABLE PRODUCTS (IN STOCK > 0)         ");
  console.log("====================================================");

  // Using Array.filter() to find products with stock greater than 0
  const availableItems = items.filter(product => product.stock > 0);

  // Log each available item with clear details
  availableItems.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.name.padEnd(12)} | Category: ${item.category.padEnd(12)} | Price: Rs. ${item.price.toLocaleString().padStart(7)} | Stock: ${item.stock}`
    );
  });

  console.log(`\nTotal Available Items: ${availableItems.length} out of ${items.length}\n`);
  return availableItems;
}

/**
 * 2. Calculate order subtotal, apply 10% discount if subtotal > 50,000, and compute final total
 * @param {Array} orderItems - Array of products or ordered items (with optional quantity)
 * @returns {Object} Calculated summary object
 */
function calculateOrder(orderItems) {
  // Compute subtotal using Array.reduce()
  const subtotal = orderItems.reduce((acc, item) => {
    const qty = item.quantity || 1;
    return acc + (item.price * qty);
  }, 0);

  // Discount condition: 10% discount if subtotal > Rs. 50,000
  const DISCOUNT_THRESHOLD = 50000;
  const DISCOUNT_PERCENT = 10;
  
  let discountAmount = 0;
  let isDiscountApplied = false;

  if (subtotal > DISCOUNT_THRESHOLD) {
    discountAmount = (subtotal * DISCOUNT_PERCENT) / 100;
    isDiscountApplied = true;
  }

  const finalTotal = subtotal - discountAmount;

  return {
    items: orderItems,
    subtotal: subtotal,
    isDiscountApplied: isDiscountApplied,
    discountRate: isDiscountApplied ? DISCOUNT_PERCENT : 0,
    discountAmount: discountAmount,
    finalTotal: finalTotal
  };
}

/**
 * 3. Print a clean, formatted invoice / order summary in the console
 * @param {Object} orderSummary - Summary object returned by calculateOrder
 */
function printInvoice(orderSummary) {
  const line = "-".repeat(52);
  const doubleLine = "=".repeat(52);

  console.log(doubleLine);
  console.log("               DIGISKILLS TECH STORE                ");
  console.log("                CUSTOMER ORDER INVOICE              ");
  console.log(doubleLine);
  console.log(
    "Item".padEnd(18) +
    "Qty".padEnd(8) +
    "Unit Price".padEnd(14) +
    "Total (Rs.)".padStart(12)
  );
  console.log(line);

  orderSummary.items.forEach(item => {
    const qty = item.quantity || 1;
    const itemTotal = item.price * qty;
    console.log(
      item.name.padEnd(18) +
      String(qty).padEnd(8) +
      `Rs. ${item.price.toLocaleString()}`.padEnd(14) +
      `Rs. ${itemTotal.toLocaleString()}`.padStart(12)
    );
  });

  console.log(line);
  console.log(`Subtotal:`.padEnd(38) + `Rs. ${orderSummary.subtotal.toLocaleString()}`.padStart(14));

  if (orderSummary.isDiscountApplied) {
    console.log(
      `Discount (${orderSummary.discountRate}% on orders > Rs. 50,000):`.padEnd(38) +
      `- Rs. ${orderSummary.discountAmount.toLocaleString()}`.padStart(14)
    );
  } else {
    console.log(
      `Discount (0% - Not eligible for > Rs. 50k):`.padEnd(38) +
      `Rs. 0`.padStart(14)
    );
  }

  console.log(doubleLine);
  console.log(`FINAL TOTAL PAYABLE:`.padEnd(38) + `Rs. ${orderSummary.finalTotal.toLocaleString()}`.padStart(14));
  console.log(doubleLine);
  console.log("        Thank you for shopping with us!             \n");
}

// ============================================================================
// EXECUTION & DEMONSTRATION
// ============================================================================

// Step 1: Filter and show available products
const availableProducts = getAvailableProducts(products);

// Step 2 & 3 Demo A: Order exceeding Rs. 50,000 (Qualifies for 10% Discount)
console.log(">>> SCENARIO A: Order > Rs. 50,000 (1x Laptop + 1x Monitor)");
const orderA = [
  { name: "Laptop", price: 85000, quantity: 1 },
  { name: "Monitor", price: 25000, quantity: 1 }
];
const summaryA = calculateOrder(orderA);
printInvoice(summaryA);

// Step 2 & 3 Demo B: Order below Rs. 50,000 (No Discount)
console.log(">>> SCENARIO B: Order <= Rs. 50,000 (1x Keyboard + 2x USB Cable)");
const orderB = [
  { name: "Keyboard", price: 3500, quantity: 1 },
  { name: "USB Cable", price: 700, quantity: 2 }
];
const summaryB = calculateOrder(orderB);
printInvoice(summaryB);

// Export for module usage (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { products, getAvailableProducts, calculateOrder, printInvoice };
}
