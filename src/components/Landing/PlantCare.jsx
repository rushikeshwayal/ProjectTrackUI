import ProjectMonitoring1Jpg from "../../assets/Slider 2.jpg";
import ProjectMonitoring2Jpg from "../../assets/Slider 3.jpg";

function ProjectMonitoring() {
    return (
        <div className="flex flex-wrap justify-center relative mt-20 sm:flex-row flex-col">
            {/* First image with dark overlay */}
            <div className="relative sm:w-[50%] h-[400px]">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img className="w-full relative z-0 h-[400px] bg-cover object-cover" src={ProjectMonitoring1Jpg} alt="Project Monitoring" />
                <div className="absolute inset-0 flex justify-center text-start flex-col ml-10 gap-3 z-20">
                    <h1 className="text-white text-2xl font-bold">Streamlined Project Tracking</h1>
                    <p className="text-white text-xl mb-20">Monitor your project progress efficiently and effectively.</p>
                    <a className="text-white text-sm font-bold hover:text-green-500" href=".">Learn More →</a>
                </div>
            </div>

            {/* Second image with dark overlay */}
            <div className="relative sm:w-[50%] hidden sm:block">
                <div className="absolute inset-0 bg-black/55 z-10"></div>
                <img className="w-full relative z-0 h-[400px] bg-cover object-cover" src={ProjectMonitoring2Jpg} alt="Project Updates" />
                <div className="absolute inset-0 flex justify-center text-start flex-col ml-10 gap-3 z-20">
                    <h1 className="text-white text-2xl font-bold">Collaborative Progress Updates</h1>
                    <p className="text-white text-xl mb-20">Keep stakeholders informed with real-time updates and insights.</p>
                    <a className="text-white text-sm font-bold hover:text-green-500" href=".">Discover More →</a>
                </div>
            </div>
        </div>
    );
}

export default ProjectMonitoring;
