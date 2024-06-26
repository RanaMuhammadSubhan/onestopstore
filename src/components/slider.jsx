import banner from "../assets/images/banner1.png";
const Slider = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 min-h-96 flex items-center justify-center">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-5xl font-bold text-white mb-4">SALES</h1>
          <p className="text-white text-lg mb-6">
            An online store catering to all electronic gadget lovers. Our wide
            variety of products come from top-notch brands and offer high
            quality at competitive prices. Order Now!
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <button className="bg-transparent border-2 bg-white text-black font-semibold py-2 px-4 rounded">
              ABOUT US
            </button>
            <button className="bg-black text-white font-semibold py-2 px-4 rounded transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-black duration-300">
              SHOP NOW
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img src={banner} alt="Headphones" className="w-full max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
