import CMPDILogo from '../../assets/CMPDILogo.png';
import CoalLogo from '../../assets/CoalMinistryLogo.png';
import PragatiTrackLoogo from '../../assets/PragatiLogo.png';

function MinistryLogos() {
    return (
        <div className='flex justify-between items-center w-full bg-gray-100 p-4 '>
            <div className='flex items-center justify-center w-1/2 md:w-1/4 lg:w-1/6'>
                <img 
                    src={CMPDILogo} 
                    alt='CMPDI Logo' 
                    className='max-h-16 md:max-h-20 lg:max-h-24 w-auto' 
                />
            </div>
              <div className='flex flex-col items-center justify-center w-1/2 md:w-1/4 lg:w-1/4'>
                <img 
                    src={PragatiTrackLoogo} 
                    alt='Coal Ministry Logo' 
                    className='max-h-12 md:max-h-28 lg:max-h-12 w-auto' 
                />
                <h1 className='text-center font-semibold'>Streamlining Technology with Purposeful Precision</h1>
            </div>
            <div className='flex items-center justify-center w-1/2 md:w-1/4 lg:w-1/6'>
                <img 
                    src={CoalLogo} 
                    alt='Coal Ministry Logo' 
                    className='max-h-16 md:max-h-20 lg:max-h-24 w-auto' 
                />
            </div>
            
        </div>
    );
};

export default MinistryLogos;
