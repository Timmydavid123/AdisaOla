import { useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from 'emailjs-com';
import './ContactForm.css';
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
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'David Adeleke' // Replace with your name
      };

      await emailjs.send(
        'service_6oq0men', // Replace with your EmailJS service ID
        'template_idjxvox', // Replace with your EmailJS template ID
        templateParams,
        'XKMECWaGxJ2p3DpdW' // Replace with your EmailJS user ID
      );
      
      // Show success message
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again later.');
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
            <p>Thank you for contacting us. We'll get back to you soon.</p>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
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
        
        {/* Left side: Contact details */}
        <div className="space-y-6 md:col-span-1">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-600">We’d love to hear from you. Reach us directly or use the form.</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">+234 801 234 5678</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">support@example.com</p>
            </div>
          </div>
        </div>

        {/* Right side: Form (takes more space) */}
        <div className="bg-white shadow-md rounded-xl p-6 md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-400'
                }`}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-400'
                }`}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.subject ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-400'
                }`}
              />
              {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message *</label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.message ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-400'
                }`}
              />
              {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </>
);
};

export default ContactForm;