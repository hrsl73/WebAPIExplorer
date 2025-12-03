import { useEffect, useState} from 'react'




function Providers(){

    const [providers,setProviders] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
    fetch("https://api.apis.guru/v2/providers.json")
        .then((res) => 
            res.json()
        )
        .then((data) => {
            setProviders(data.data)
            setLoading(false);
            // console.log(data)
            // console.log(data.data)
            // console.log(`in second then=> ${providers}`)
        })
        .catch((error) => {
            console.log("Error fetching providers:", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p className="text-white text-xl">Loading Providers...</p>;
    }




    return(
        <>
        {/* <h1>Helloooo</h1> */}
            <nav className="bg-white p-4 justify-center">
                <ul className="flex flex-col gap-6 overflow-y-auto h-screen mt-6 ">
                    {providers.map((provider) => (
                        <li key={provider}
                        className="cursor-pointer font-semibold hover:text-blue-600 border-b pb-2 w-[300px] "
                        onClick={()=>{console.log(`${provider} is working`)}}
                        >
                            {provider}
                        </li>
                        ))}
                </ul>
            </nav>
        </>
    )
}

export default Providers