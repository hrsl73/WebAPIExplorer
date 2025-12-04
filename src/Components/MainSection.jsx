import Providers from './Providers'


// when displaying list hide button..
// import { useState } from 'react'


// function MainSection(){

//     const [showProviders, setShowProviders] = useState(false)
//     return (
//         <div className="flex justify-center items-center h-screen bg-blue-300">
//         {showProviders ? (
//             <Providers />   
//         ) : (
//             <button
//             className="text-xl font-bold text-white bg-blue-700 px-6 py-3 rounded-lg"
//             onClick={() => setShowProviders(true)}
//             >
//             Explore Web APIs
//             </button>
//         )}
//         </div>
//     );
// }

// export default MainSection


// displaying both button and list together
import { useState } from 'react';

function MainSection() {
    const [showProviders, setShowProviders] = useState(false);

    return (
        <div className="flex justify-center items-center h-screen bg-blue-300 relative"> 
                
                <button
                    className="text-xl font-bold text-white bg-blue-700 px-6 py-3 rounded-lg"
                    onClick={() => setShowProviders(true)}
                >
                    Explore Web APIs
                </button>
                {showProviders && (
                    <div className="absolute top-0 right-0 h-full w-100 bg-white shadow-2xl z-10 p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">API List</h2>
                            <button 
                                onClick={() => setShowProviders(false)}
                                className="text-red-500 font-bold"
                            >
                                X
                            </button>
                        </div>
                        <Providers />
                    </div>
                )}
            </div>
        );
    }
export default MainSection