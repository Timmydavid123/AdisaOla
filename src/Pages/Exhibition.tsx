import { Link } from "react-router-dom"; 
import { exhibitionItems } from "../data/exhibit-data copy";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default function Exhibition() {
  return (
    <>
      {/* Header */}
      <Header />
      <div className="min-h-screen bg-white">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl mb-6 font-light tracking-wider">
                EXHIBITIONS & PUBLICATIONS
              </h1>
              <div className="w-24 h-1 bg-gray-800 mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {exhibitionItems.map((item) => {
                const isExternal = item.link.startsWith("http");

                const CardContent = (
                  <div className="relative overflow-hidden h-96">
                    {/* Image with overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Hover content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <button className="self-start text-white text-xs border border-white/40 hover:border-white px-3 py-2 tracking-widest transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        VIEW PROJECT
                      </button>
                    </div>

                    {/* Always visible title */}
                    <div className="absolute bottom-4 left-4 z-15">
                      <h3 className="text-white text-lg font-light tracking-wide">
                        {item.title}
                      </h3>
                      <span className="text-xs text-gray-300">{item.category}</span>
                    </div>
                  </div>
                );

                return isExternal ? (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group overflow-hidden rounded-none shadow-md hover:shadow-xl transition-all duration-700 relative bg-black block"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="group overflow-hidden rounded-none shadow-md hover:shadow-xl transition-all duration-700 relative bg-black block"
                  >
                    {CardContent}
                  </Link>
                );
              })}
            </div>

            <div className="text-center">
              <p className="text-[10px] text-black tracking-widest font-light">
                EXPLORE MORE WORK AND COLLABORATIONS
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
