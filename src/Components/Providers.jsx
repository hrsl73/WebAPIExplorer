import { useEffect, useState } from 'react'
import ProvidersDetails from './ProvidersDetails'


// code for getting title in dropdown
function ProviderItem({ providerName, onApiClick }) {
    const [isOpen, setIsOpen] = useState(false);
    const [apiList, setApiList] = useState(null); 
    const [loading, setLoading] = useState(false);

    const handleToggle = () => {

        const nextState = !isOpen;
        setIsOpen(nextState);


        if (nextState && !apiList) {
            setLoading(true);
            fetch(`https://api.apis.guru/v2/${providerName}.json`)
                .then(res => res.json())
                .then(data => {

                    const fullApiObjects = Object.values(data.apis);
                    setApiList(fullApiObjects);
                    setLoading(false);

                    // console.log(`only data`)
                    // console.log(data)
                    // console.log(`data.apis`)
                    // console.log(data.apis)
                    // console.log(`full api objects`)
                    // console.log(fullApiObjects)
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    };

    return (
        <li className="border-b border-gray-200">

            <div 
                onClick={handleToggle}
                className="flex justify-between items-center p-3 cursor-pointer hover:bg-blue-50 transition-colors"
            >
                <span className="font-semibold text-gray-700">{providerName}</span>
                {/* {console.log(providerName)} */}
                <span className="text-gray-400 text-sm">
                    {isOpen ? "▲" : "▼"}
                </span>
            </div>


            {isOpen && (
                <div className="bg-gray-50 p-3 pl-6 text-sm text-gray-600 border-t border-gray-100">
                    {loading ? (
                        <p className="italic text-blue-500">Loading API details...</p>
                    ) : 
                    (
                        <ul className="list-disc pl-4 space-y-2">
                            {apiList && apiList.map((api, index) => (
                                <li 
                                    key={index} 
                                    className="hover:text-blue-600 cursor-pointer hover:underline font-medium"

                                    onClick={() => onApiClick(api)}
                                >
                                    {api.info.title}  , {api.info.version}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </li>
    );
}

// main logic for rendering list of apis 
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


    if (selectedApi) {
    return (
        <ProvidersDetails 
        details={selectedApi} 
        onBack={() => setSelectedApi(null)} 
        />
    );
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