import Providers from './Providers'
import { useState } from 'react'


function MainSection(){

    const [showProviders, setShowProviders] = useState(false)
    return (
        <div className="flex justify-center items-center h-screen bg-blue-300">
        {showProviders ? (
            <Providers />   
        ) : (
            <button
            className="text-xl font-bold text-white bg-blue-700 px-6 py-3 rounded-lg"
            onClick={() => setShowProviders(true)}
            >
            Explore Web APIs
            </button>
        )}
        </div>
    );
}

export default MainSection