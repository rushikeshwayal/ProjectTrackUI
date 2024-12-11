import LandingHome from "./LandingHome";
import Nonummy from './Nonummy';
import PlantCare from './PlantCare';
import Footer from './Footer';
import Feature from './Features';
import MinistryLogos from '../Common/MinistryLogos';

function HomeLanding() {
    return(
        <div className="">
          <MinistryLogos/>
        <LandingHome />
         <Feature />
        <Nonummy />
         <PlantCare />
         <Footer />   
      </div>
    );
}

export default HomeLanding;