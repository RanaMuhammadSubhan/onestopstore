import React, { useState } from "react";
import useCartStore from "../cartStore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { cart } = useCartStore();
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    companyName: "",
    vatNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming order is placed successfully
    Swal.fire({
      title: "Order Placed Successfully",
      text: "Thank you for your purchase!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      clearCart();
      navigate("/"); // Redirect to homepage
    });
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="checkout container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className="w-full p-2 border"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email"
              className="w-full p-2 border"
              required
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            >
              <option value="">Select Country</option>
              <option value="Pakistan">Pakistan</option>
              {/* Add more countries as needed */}
            </select>
            <select
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="w-full p-2 border"
              required
            >
              <option value="">Select City</option>
              <option value="Faislabad">Faisalabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
            </select>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full p-2 border"
              required
            />
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="w-full p-2 border"
            />
            <input
              type="text"
              name="Note"
              value={formData.vatNumber}
              onChange={handleInputChange}
              placeholder="Note"
              className="w-full p-2 border"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="w-full p-2 border"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Payment</h2>
            <div className="space-y-2">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Credit Card"
                  checked={formData.paymentMethod === "Credit Card"}
                  onChange={handleInputChange}
                />
                Credit Card
              </label>
              <label className="ml-2 pr-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Payment on Delivery"
                  checked={formData.paymentMethod === "Payment on Delivery"}
                  onChange={handleInputChange}
                />
                Cash on Delivery
              </label>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Order Summary</h2>
                <p className="ml-0 py-3">Subtotal: ${totalAmount.toFixed(2)}</p>
                <p className="ml-0 py-3">
                  Tax: ${(totalAmount * 0.1).toFixed(2)}
                </p>
                <p className="ml-0 py-3">
                  Total: ${(totalAmount + totalAmount * 0.1).toFixed(2)}
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
