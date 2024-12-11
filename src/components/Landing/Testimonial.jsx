import MainBgJpg from '../LandingAssets/mainbg.jpg';
import Testo from './Testo';

function CMPDITestimonial() {
  return (
    <div id='cmpdi-testimonial' className="relative w-full mt-0 min-h-screen">
      {/* Image Container */}
      <div
        className="w-full h-[850px] relative bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${MainBgJpg})` }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Text overlay (scrolls while image remains fixed) */}
      <div className="absolute top-0 w-full h-[850px] flex flex-col justify-start mt-10 items-center z-20 px-4 md:px-8 lg:px-16">
        <h1 className="text-green-400 text-sm font-bold">CMPDI Project Monitoring</h1>
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Feedback from Project Investigators
        </h1>
      </div>

      {/* Feedback cards in row */}
      <div className="w-full flex flex-wrap justify-center items-center md:gap-5 gap-5 mt-10 md:mt-0 sm:flex-row z-20 absolute top-[100px] md:top-[250px] px-4 md:px-16">
        <Testo feedback="This system has greatly streamlined project updates." name="Dr. A. Kumar" />
        <Testo feedback="The automated reminders ensure no deadlines are missed." name="Ms. S. Gupta" />
      </div>
    </div>
  );
}

export default CMPDITestimonial;