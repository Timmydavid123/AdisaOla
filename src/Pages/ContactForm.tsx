import { useState, type ChangeEvent, type FormEvent } from "react";
import "./ContactForm.css";
import Header from "../component/Header";
import Footer from "../component/Footer";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  // Backend API URL - use environment variable or default
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4242";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    
    // Clear API error when user starts typing
    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError("");
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      if (!data.success) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error("Contact form error:", err);
      setApiError(err instanceof Error ? err.message : "Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Header />
        <div className="contact-success">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h2>Message Sent Successfully!</h2>
            <p>Thank you for contacting us. We've sent a confirmation to your email and will get back to you soon.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="back-button"
            >
              Send Another Message
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full px-6 pt-24 pb-12 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-6 md:col-span-1">
            <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
            <p className="text-gray-600">
              We'd love to hear from you. Reach us directly or use the form.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+44 7887 851220</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">info@adisaolashile.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 md:col-span-2">
            {apiError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 font-medium">Error: {apiError}</p>
                <p className="text-red-600 text-sm mt-1">
                  Please check your information and try again, or contact us directly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 focus:ring-blue-400"
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 focus:ring-blue-400"
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.subject
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 focus:ring-blue-400"
                  }`}
                />
                {errors.subject && (
                  <p className="text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message..."
                  className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.message
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 focus:ring-blue-400"
                  }`}
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              
              <p className="text-sm text-gray-500 text-center">
                You'll receive a confirmation email after submitting.
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactForm;