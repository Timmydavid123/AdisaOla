import { motion } from "framer-motion"
import Header from "../component/Header"
import Footer from "../component/Footer"

export default function AboutMe() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* About Me Section */}
      <section className="bg-white text-white py-20 px-6 md:px-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Image with Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img 
              src="/user1.jpg" 
              alt="3D Artist" 
              className="rounded-2xl shadow-2xl transition duration-500 w-[380px] h-auto object-cover border-4 border-gray-800"
            />
          </motion.div>

          {/* Right Side - About Me */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl mb-6 text-black tracking-tight font-light">
              About Me
            </h2>
            <p className="text-gray-900 leading-relaxed text-lg mb-6 text-justify font-light">
              I am <span className="text-black font-semibold">Adisa Olashile, </span>a London-based creative photographer originally from Nigeria. My work spans portraiture, storytelling, documentary, lifestyle, and fashion, each series I have created telling stories rooted in identity, resilience, and everyday moments. I've captured everything from emotive celebrations like Women's Day series to culturally rich community chronicles, such as my “Africa Mothers in Peckham” , “ Disapora in Peckham "Lagos meets London" project and street series “Peckham Pimps” 
              One of my projects that gained significant attention was the series featuring<span className="text-black font-semibold"> “Baba Onilu,” </span>an elderly Nigerian drummer whose portrait I minted as an NFT and shared half the proceeds, bringing both dignity and connection through visual storytelling 
              Driven by a passion for people and cultural heritage, I use my lens to highlight expressions, community, and the power of small yet profound human moments.
            </p>

            {/* Download Resume Button */}
            <motion.a 
              href="/resume.pdf" 
              download 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-300 transition"
            >
              ⬇ Download Resume
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}
