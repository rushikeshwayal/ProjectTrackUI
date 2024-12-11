import CoutesPng from "../LandingAssets/Coutes.png";
import FacebookIcon from "../LandingAssets/facebookIcon.png";
import InstaIcon from "../LandingAssets/icons8-instagram-24.png";
import LinkdinIcon from "../LandingAssets/icons8-linkedin-24.png";
import YoutubeIcon from "../LandingAssets/icons8-youtube-24.png";
import Bg1 from "../../assets/slider 4.jpg";

function CMPDIPortal() {
    return (
        <div id="about" className="flex flex-col md:flex-row items-center mt-10 md:mt-20 gap-6 md:justify-center md:gap-12">
            <div className="flex  md:flex-row gap-4 md:gap-6">
                <img className="h-64 md:h-[450px] w-full object-cover rounded-lg shadow-lg" src={Bg1} alt="CMPDI Monitoring Overview" />
            </div>
            <div className="w-full md:w-[600px] text-center md:text-left">
                <div className="flex flex-col gap-5">
                    <h1 className="text-xl md:text-2xl text-green-500 font-bold">
                        Empowering Research Excellence!
                    </h1>
                    <p className="text-3xl md:text-5xl font-bold">Streamlined Project Monitoring</p>
                    <p className="text-lg md:text-xl">
                        The CMPDI Portal revolutionizes the tracking and management of R&D and S&T projects by centralizing data entry, automating updates, and enhancing communication.
                    </p>
                    <img className="w-8 mx-auto size-5 ml-36 absolute top-[1740px] left-[550px] hidden sm:block" src={CoutesPng} alt="Quote Icon" />
                    <p className="text-lg md:text-xl">
                        By integrating advanced features, this platform reduces manual effort, ensures data accuracy, and accelerates project success in line with CMPDI mission.
                    </p>
                </div>
                <div className="flex justify-center md:justify-start space-x-5 mt-5">
                    <img
                        className="h-10 w-10 md:h-12 md:w-12 bg-cover p-1 rounded-full object-contain hover:bg-green-300 transition duration-300"
                        src={FacebookIcon}
                        alt="CMPDI Facebook"
                    />
                    <img
                        className="h-10 w-10 md:h-12 md:w-12 bg-cover p-1 rounded-full object-contain hover:bg-green-300 transition duration-300"
                        src={InstaIcon}
                        alt="CMPDI Instagram"
                    />
                    <img
                        className="h-10 w-10 md:h-11 md:w-11 bg-cover p-1 rounded-full object-contain hover:bg-green-300 transition duration-300"
                        src={LinkdinIcon}
                        alt="CMPDI LinkedIn"
                    />
                    <img
                        className="h-10 w-10 md:h-12 md:w-12 bg-cover p-1 rounded-full object-contain hover:bg-green-300 transition duration-300"
                        src={YoutubeIcon}
                        alt="CMPDI YouTube"
                    />
                </div>
            </div>
        </div>
    );
}

export default CMPDIPortal;
