import { Link, useParams } from "react-router-dom";
import { portfolioItems } from "../data/portfolio-data";
import { ArrowLeft } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const portfolio = portfolioItems.find((item) => item.id === id);

  if (!portfolio) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-light mb-4">Project Not Found</h1>
            <Link
              to="/portfolio"
              className="text-xs tracking-widest text-gray-600 hover:text-black transition-colors"
            >
              BACK TO PORTFOLIO
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <div className="fixed top-6 left-6 z-50">
          <Link
            to="/portfolio"
            className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            <span className="text-xs tracking-widest font-light">BACK TO PORTFOLIO</span>
          </Link>
        </div>

        {/* Hero Section - Full Width Image */}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="w-full h-full">
            <img
              src={portfolio.images.hero || "/placeholder.svg"}
              alt={portfolio.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-12 left-12 text-white">
            <span className="text-xs tracking-widest text-gray-300 mb-2 block">{portfolio.category}</span>
            <h1 className="text-6xl font-light tracking-wider mb-4">{portfolio.title}</h1>
          </div>
        </section>

        {/* Content Section 1 - Text */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <p className="text-[10px] text-gray-800 leading-relaxed font-light mb-8 text-justify">{portfolio.description}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed font-light text-justify">{portfolio.content.details}</p>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs tracking-widest text-gray-400 mb-2">DATE</h3>
                  <p className="text-[10px] text-gray-800">{portfolio.date}</p>
                </div>
                {portfolio.client && (
                  <div>
                    <h3 className="text-xs tracking-widest text-gray-400 mb-2">LOCATION</h3>
                    <p className="text-[10px] text-gray-800">{portfolio.client}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-xs tracking-widest text-gray-400 mb-2">TAGS</h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.tags.map((tag, index) => (
                      <span key={index} className="text-[10px] text-gray-600 bg-gray-100 px-2 py-1">
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image - Centered natural size */}
<section className="py-12">
  <div className="max-w-5xl mx-auto px-6 flex justify-center">
    <img
      src={portfolio.images.featured || "/placeholder.svg"}
      alt={`${portfolio.title} featured`}
      className="w-auto h-auto max-w-full object-contain shadow-lg"
    />
  </div>
</section>

{/* First Two-Sided Images */}
<section className="py-12 px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="flex justify-center items-center overflow-hidden">
      <img
        src={portfolio.images.gallery[0] || "/placeholder.svg"}
        alt={`${portfolio.title} gallery 1`}
        className="w-auto h-auto max-w-full object-contain"
      />
    </div>
    <div className="flex justify-center items-center overflow-hidden">
      <img
        src={portfolio.images.gallery[1] || "/placeholder.svg"}
        alt={`${portfolio.title} gallery 2`}
        className="w-auto h-auto max-w-full object-contain"
      />
    </div>
  </div>
</section>




        {/* Text Section 2 */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] text-gray-700 leading-relaxed font-light text-justify">{portfolio.content.conclusion}</p>
          </div>
        </section>
        
        {/* Full Width Middle Image */}
<section className="relative w-full overflow-hidden py-8">
  <div className="max-w-4xl mx-auto flex justify-center">
    <img
      src={portfolio.images.gallery[2] || "/placeholder.svg"}
      alt={`${portfolio.title} gallery 3`}
      className="w-auto h-auto max-w-full object-contain rounded-lg shadow-lg"
    />
  </div>
</section>
        
        {/* Second Two-Sided Images */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square overflow-hidden">
                <img
                  src={portfolio.images.gallery[3] || "/placeholder.svg"}
                  alt={`${portfolio.title} gallery 4`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src={portfolio.images.gallery[4] || "/placeholder.svg"}
                  alt={`${portfolio.title} gallery 5`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Third Two-Sided Images (New) */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square overflow-hidden">
                <img
                  src={portfolio.images.gallery[5] || "/placeholder.svg"}
                  alt={`${portfolio.title} gallery 6`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src={portfolio.images.gallery[6] || "/placeholder.svg"}
                  alt={`${portfolio.title} gallery 7`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Additional Full Width Image Section (New) */}
        <section className="relative w-full overflow-hidden py-8">
          <div className="max-w-4xl mx-auto">
            <img
              src={portfolio.images.gallery[7] || "/placeholder.svg"}
              alt={`${portfolio.title} gallery 8`}
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </section>
        
        {/* Fourth Two-Sided Images (New) */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center items-center overflow-hidden">
                <img
                  src={portfolio.images.gallery[8] || "/placeholder.svg"}
                  alt={`${portfolio.title} gallery 9`}
                  className="w-auto h-auto max-w-full object-contain"
                />
              </div>
             <div className="flex justify-center items-center overflow-hidden">
                <img
                  src={portfolio.images.gallery[9] || "/placeholder.svg"}
                  alt={`${portfolio.title} gallery 10`}
                  className="w-auto h-auto max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final Full Width Section */}
        <section className="relative w-full overflow-hidden">
          <div className="w-full aspect-video">
            <img
              src={portfolio.images.gallery[10] || "/placeholder.svg"}
              alt={`${portfolio.title} final`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30" />
        </section>

        {/* Navigation to Next Project */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xs tracking-widest text-gray-400 mb-8">EXPLORE MORE WORK</h3>
            <Link
              to="/portfolio"
              className="inline-block bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 text-xs tracking-widest transition-all duration-300 font-light"
            >
              VIEW ALL PROJECTS
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}