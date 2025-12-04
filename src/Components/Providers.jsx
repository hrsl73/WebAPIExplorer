import { useEffect, useState } from 'react'
import ProvidersDetails from './ProvidersDetails'

// --- 1. CHILD COMPONENT (Handles individual Dropdown logic) ---
function ProviderItem({ providerName, onApiClick }) {
    const [isOpen, setIsOpen] = useState(false);
    const [apiList, setApiList] = useState(null); // Changed: Stores full API objects now
    const [loading, setLoading] = useState(false);

    const handleToggle = () => {
        // Toggle the open state
        const nextState = !isOpen;
        setIsOpen(nextState);

        // If opening AND we haven't fetched data yet, fetch it now.
        if (nextState && !apiList) {
            setLoading(true);
            fetch(`https://api.apis.guru/v2/${providerName}.json`)
                .then(res => res.json())
                .then(data => {
                    // Extract the FULL objects so we can pass description/contact info later
                    const fullApiObjects = Object.values(data.apis);
                    setApiList(fullApiObjects);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    };

    return (
        <li className="border-b border-gray-200">
            {/* The Clickable Header */}
            <div 
                onClick={handleToggle}
                className="flex justify-between items-center p-3 cursor-pointer hover:bg-blue-50 transition-colors"
            >
                <span className="font-semibold text-gray-700">{providerName}</span>
                <span className="text-gray-400 text-sm">
                    {isOpen ? "▲" : "▼"}
                </span>
            </div>

            {/* The Dropdown Content */}
            {isOpen && (
                <div className="bg-gray-50 p-3 pl-6 text-sm text-gray-600 border-t border-gray-100">
                    {loading ? (
                        <p className="italic text-blue-500">Loading API details...</p>
                    ) : (
                        <ul className="list-disc pl-4 space-y-2">
                            {apiList && apiList.map((api, index) => (
                                <li 
                                    key={index} 
                                    className="hover:text-blue-600 cursor-pointer hover:underline font-medium"
                                    // CHANGE: When clicked, send the WHOLE api object up to the parent
                                    onClick={() => onApiClick(api)}
                                >
                                    {api.info.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </li>
    );
}


function Providers(){

    const [providers, setProviders] = useState([])
    const [loading, setLoading] = useState(true)
    
    // CHANGE: New state to track which specific API is clicked
    const [selectedApi, setSelectedApi] = useState(null)


    useEffect(() => {
    fetch("https://api.apis.guru/v2/providers.json")
        .then((res) => 
            res.json()
        )
        .then((data) => {
            setProviders(data.data)
            setLoading(false);
        })
        .catch((error) => {
            console.log("Error fetching providers:", error);
            setLoading(false);
        });
    }, []);

    // CHANGE: View Switching Logic
    // If we have a selected API, show the Details Screen instead of the list
    if (selectedApi) {
        return (
            <ProvidersDetails 
                details={selectedApi} 
                onBack={() => setSelectedApi(null)} 
            />
        )
    }

    if (loading) {
        return <p className="text-white text-xl">Loading Providers...</p>;
    }

    return (
        <nav className="bg-white p-4 flex justify-center h-screen overflow-hidden">
            <div className="w-full max-w-md h-full flex flex-col">
                <h2 className="text-xl font-bold mb-4 text-center text-blue-800">API Providers</h2>
                
                <ul className="flex flex-col overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200">
                    {providers.map((provider) => (
                        // CHANGE: We pass the handler function down to the child
                        <ProviderItem 
                            key={provider} 
                            providerName={provider} 
                            onApiClick={(apiData) => setSelectedApi(apiData)}
                        />
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Providers