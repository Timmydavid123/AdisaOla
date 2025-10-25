import { portfolioItems } from "../data/nfts-data";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default function PortfolioPage() {
  return (
    <>
      {/* Header */}
      <Header />

      <div className="min-h-screen bg-white">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl text-black mb-6 font-light tracking-wider">
                MY NFTS COLLECTION
              </h1>
              <div className="w-24 h-1 bg-gray-800 mx-auto mb-8"></div>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              {portfolioItems.map((item) => (
                <div key={item.id} className="group relative z-50">
  <a
    href={item.externalLink}
    target="_blank"
    rel="noopener noreferrer"
    className="block overflow-hidden rounded-none shadow-md hover:shadow-xl transition-all duration-700 relative bg-black z-50"
  >
    <img
      src={item.image || "/placeholder.svg"}
      alt={item.title}
      className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
    />
  </a>

  <div className="mt-4 text-center">
    <a
      href={item.externalLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-lg text-black font-bold tracking-wide hover:text-gray-700 transition-colors duration-300 z-50 relative"
    >
      {item.title}
    </a>
  </div>
</div>
              ))}
            </div>

            {/* Footer Message */}
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
