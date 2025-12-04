
import React from 'react'
import {useState} from 'react'
import Providers from './Providers'

function ProviderDetails({ details, onBack }) {

    const [showProviders, setShowProviders] = useState(false);
    
    if (!details) return null;

    const { info, swaggerUrl } = details;
    const { contact, description, title } = info;

    const logoUrl = info["x-logo"]?.url;

    return (
        <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
            {/* Header / Back Button */}
            <div className="bg-blue-600 p-4 shadow-md sticky top-0 z-10">
                <button 
                    onClick={onBack}
                    className="text-white font-bold flex items-center gap-2 hover:bg-blue-700 px-4 py-2 rounded transition"
                >
                    ← Back to List
                </button>
            </div>

            {/* Main Content Area - "The Big Square" */}
            <div className="max-w-4xl mx-auto mt-10 p-6">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">

                    
                    
                    {/* Card Header with LOGO */}
                    <div className="bg-gray-50 p-8 border-b flex flex-col md:flex-row items-start md:items-center gap-6">
                        
                        {/* 2. Display logo if it exist */}
                        {logoUrl && (
                            <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                                <img 
                                    src={logoUrl} 
                                    alt={`${title} logo`} 
                                    className="w-24 h-24 object-contain"
                                    // Add a fallback if the image fails to load
                                    onError={(e) => {e.target.style.display = 'none'}}
                                />
                            </div>
                        )}

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                v{info.version}
                            </span>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        

                        <section>
                            <h3 className="text-xl font-semibold text-gray-700 mb-3 border-l-4 border-blue-500 pl-3">Description</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {description || "No description provided."}
                            </p>
                        </section>


                        <section>
                            <h3 className="text-xl font-semibold text-gray-700 mb-3 border-l-4 border-green-500 pl-3">Swagger</h3>
                            <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm break-all flex flex-col gap-3 items-start">
                                <span>{swaggerUrl}</span>
                                <a 
                                    href={swaggerUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    Open JSON
                                </a>
                            </div>
                        </section>


                        <section>
                            <h3 className="text-xl font-semibold text-gray-700 mb-3 border-l-4 border-purple-500 pl-3">Contact Information</h3>
                            
                            {contact ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                        <p className="text-xs text-purple-600 uppercase font-bold">Name</p>
                                        <p className="text-gray-800 font-medium">{contact.name || "N/A"}</p>
                                    </div>


                                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                        <p className="text-xs text-purple-600 uppercase font-bold">Email</p>
                                        <p className="text-gray-800 font-medium break-all">
                                            {contact.email ? (
                                                <a href={`mailto:${contact.email}`} className="underline hover:text-purple-700">
                                                    {contact.email}
                                                </a>
                                            ) : "N/A"}
                                        </p>
                                    </div>


                                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                        <p className="text-xs text-purple-600 uppercase font-bold">Website</p>
                                        <p className="text-gray-800 font-medium">
                                            {contact.url ? (
                                                <a href={contact.url} target="_blank" rel="noreferrer" className="underline hover:text-purple-700">
                                                    Visit Site
                                                </a>
                                            ) : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No contact information available.</p>
                            )}
                        </section>

                            <div className="flex justify-center bg-white items-center bg-blue-300"> 
                    
                            <button
                                className="text-xl font-bold text-white bg-blue-700 px-6 py-3 rounded-lg"
                                onClick={() => setShowProviders(true)}
                            >
                                Explore more APIs
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

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProviderDetails;