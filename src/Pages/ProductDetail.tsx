// src/Pages/ProductDetail.tsx
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/productdata";
import { useCart } from "../context/CartContext";
import Header from "./Header";
import { useCurrency } from '../context/CurrencyContext';
import "../App.css";
import { frame } from "framer-motion";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, addToCart, getProductStock } = useCart();

  const product = products.find((p) => p.id === parseInt(id || ""));
  const [selectedFrame, setSelectedFrame] = useState("A2");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { formatPrice } = useCurrency();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCartDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!product) return <div>Product not found</div>;

  // Product images (supports both image & video)
  const productImages = [product.image, ...(product.additionalImages || [])];

  // Frame options
  const frameOptions = [
    { name: "A0", price: 100, dimensions: "83.82 x 104.14cm (33 x 41 inches)" },
    { name: "A1", price: 75, dimensions: "58.42 x 71.12cm (23 x 28 inches)" },
    { name: "A2", price: 50, dimensions: "40.64 x 50.8cm (16 x 20 inches)" },
    { name: "A3", price: 25, dimensions: "30.48 x 38.1cm (12 x 15 inches)" },
  ];

  const selectedFrameOption = frameOptions.find((f) => f.name === selectedFrame);
  const framePrice = selectedFrameOption ? selectedFrameOption.price : 0;
  const totalPrice = (product.price + framePrice) * quantity;
  const availableStock = getProductStock(product.id);

  // Helpers
  const calculateTotal = (): string =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const getTotalItems = (): number =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleCartDropdown = () => setShowCartDropdown(!showCartDropdown);

  // Cart updates
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) removeFromCart(productId);
    else updateQuantity(productId, newQuantity);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) return alert("Your cart is empty!");
    navigate("/checkout");
    setShowCartDropdown(false);
  };

  const handleAddToCart = () => {
    if (availableStock < quantity) return alert("Not enough stock available");

    const frameIndex = frameOptions.findIndex((f) => f.name === selectedFrame);
    const uniqueId = parseInt(`${product.id}${frameIndex}`);

    addToCart({
      id: uniqueId,
      title: `${product.title} (${selectedFrame} Size)`,
      price: product.price + framePrice,
      artist: product.artist,
      image: product.image,
      quantity,
      frame: selectedFrame,
      framePrice,
      frameDimensions: selectedFrameOption?.dimensions,
    });

    alert("Product added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const nextImage = () =>
    setCurrentImageIndex((i) => (i === productImages.length - 1 ? 0 : i + 1));
  const prevImage = () =>
    setCurrentImageIndex((i) => (i === 0 ? productImages.length - 1 : i - 1));

  return (
    <div className="product-detail-page bg-gray-50 min-h-screen">
      <Header />

      {/* Cart Header */}
      <div className="container mx-auto px-4 py-4 flex justify-end" ref={dropdownRef}>
        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={toggleCartDropdown}
          >
            🛒 <span>{getTotalItems()}</span>
            <span className="hidden sm:inline">View Cart ({formatPrice(Number(calculateTotal()))})</span>
          </button>

          {showCartDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20 p-4">
              <h3 className="font-semibold mb-2">Your Cart ({getTotalItems()} items)</h3>
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty 🛒</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center border-b pb-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-500">by {item.artist}</p>
                          {item.frame && (
                            <p className="text-xs text-gray-500">Size: {item.frame}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-2 py-1 border rounded"
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-2 py-1 border rounded"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                   <div className="flex justify-between text-sm mb-1">
                    <span>Subtotal:</span>
                    <span>{formatPrice(Number(calculateTotal()))}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Shipping:</span>
                    <span>{cartItems.length > 0 ? formatPrice(10) : formatPrice(0)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>
                      {cartItems.length > 0
                        ? formatPrice(Number(calculateTotal()) + 10)
                        : formatPrice(0)}
                    </span>
                  </div>
                  </div>
                  <button
                    onClick={proceedToCheckout}
                    className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                  >
                    🔒 Secure Checkout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:underline mb-4"
        >
          ← Back to Products
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Media */}
        <div>
          <div className="relative">
            {productImages[currentImageIndex].toLowerCase().endsWith(".mp4") ? (
              <video
                src={productImages[currentImageIndex]}
                controls
                autoPlay
                muted
                loop
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <img
                src={productImages[currentImageIndex]}
                alt={product.title}
                className="w-full rounded-lg shadow-lg"
              />
            )}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
                >
                  &lt;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
                >
                  &gt;
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {productImages.map((media, index) => (
              <div
                key={index}
                className={`cursor-pointer border-2 rounded ${
                  index === currentImageIndex ? "border-indigo-600" : "border-transparent"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                {media.toLowerCase().endsWith(".mp4") ? (
                  <video src={media} className="w-20 h-20 object-cover rounded" muted />
                ) : (
                  <img src={media} alt={`thumb-${index}`} className="w-20 h-20 object-cover rounded" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">by {product.artist}</p>

          <p className="text-lg">{product.description}</p>

                  <div className="text-2xl font-semibold text-indigo-600">
          {formatPrice(totalPrice)}
        </div>

          {framePrice > 0 && (
            <p className="text-sm text-gray-500">
              (Art: {formatPrice(product.price)} + Frame: {formatPrice(framePrice)})
            </p>
          )}

          {availableStock > 0 ? (
            <p className="text-green-600">In Stock ({availableStock} available)</p>
          ) : (
            <p className="text-red-500">Out of Stock</p>
          )}

          {/* Frame Selection */}
          <div>
            <h3 className="font-semibold mb-2">Print Size Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {frameOptions.map((frame) => (
                <div
                  key={frame.name}
                  className={`p-3 border rounded cursor-pointer ${
                    selectedFrame === frame.name ? "border-indigo-600 bg-indigo-50" : ""
                  }`}
                  onClick={() => setSelectedFrame(frame.name)}
                >
                  <p className="font-medium">Size {frame.name}</p>
                  <p className="text-sm text-gray-500">{frame.dimensions}</p>
                 <p className="text-sm">
                    {frame.price > 0 ? `+${formatPrice(frame.price)}` : "Included"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block mb-1 font-medium">
              Quantity
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              disabled={availableStock === 0}
              className="border rounded px-3 py-2"
            >
              {[...Array(Math.min(availableStock, 10))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              disabled={availableStock === 0}
              className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={availableStock === 0}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Buy Now
            </button>
          </div>

          {/* Product Specs */}
          <div>
            <h3 className="font-semibold mb-2">Product Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <p>
                <span className="font-medium">Dimensions:</span> {product.dimensions}
              </p>
              <p>
                <span className="font-medium">Medium:</span> {product.medium}
              </p>
              <p>
                <span className="font-medium">Warranty:</span> {product.warranty}
              </p>
            </div>
          </div>

          {/* Warnings */}
          <div>
            <h3 className="font-semibold mb-2">Important Information</h3>
            <p className="text-red-600">⚠️ {product.warnings}</p>
          </div>

          {/* Care Instructions */}
          <div>
            <h3 className="font-semibold mb-2">Care Instructions</h3>
            <p>{product.careInstructions}</p>
          </div>

          {/* Return Policy */}
          <div>
            <h3 className="font-semibold mb-2">Return Policy</h3>
            <p>{product.returnPolicy}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center py-6 text-sm text-gray-500">
        © 2025 Adisa Olashile. All rights reserved.
      </p>
    </div>
  );
};

export default ProductDetail;
