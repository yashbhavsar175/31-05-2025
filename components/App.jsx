import './App.css'
import { useState } from 'react'

function App() {
    const [inputUrl, setInputUrl] = useState("");
    const [urlList, setUrlList] = useState([]);
    const [loading, setLoading] = useState(false);

    const PostData = async (e) => {
        e.preventDefault();
        
        if (!inputUrl) {
            alert("Please enter a URL");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/fetch-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: inputUrl })
            });

            const data = await response.json();
            setUrlList([data, ...urlList]);
            setInputUrl("");

        } catch (error) {
            console.error("Error:", error);
            alert("Error fetching URL data");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex items-center justify-center h-screen bg-gray-900'>
            <div className='bg-white p-7 rounded-lg shadow-lg max-w-3xl w-full'>
                <div>
                    <h1 className='text-4xl font-bold mb-6'>Link Preview Dashboard</h1>
                </div>
                <div className='flex mt-10'>
                    <input 
                        className='fetch_url flex-1 p-2 border-2 rounded-md' 
                        placeholder='Enter a URL here'
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                    />
                    <button 
                        type="button" 
                        onClick={PostData} 
                        className='ml-5 bg-blue-600 text-amber-50 flex justify-center items-center p-3 rounded-md hover:bg-blue-700 transition-colors'
                        disabled={loading}
                    >
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
                                    <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                </svg>
                                <span className="ml-2">Preview</span>
                            </>
                    </button>
                </div>

                <div className='mt-10'>
                    <h2 className='text-2xl font-semibold mb-4'>Previously Submitted Links</h2>
                </div>
                <div className='border-2 rounded-lg'>
                    {urlList.length === 0 ? (
                        <div className='p-4 text-center text-gray-500'>
                            No links submitted yet
                        </div>
                    ) : (
                        urlList.map((item, index) => (
                            <div key={index} className='flex items-center p-4 border-b last:border-b-0'>
                                <div className='image flex-shrink-0'>
                                    {item.favicon ? (
                                        <img 
                                            src={item.favicon} 
                                            alt="favicon" 
                                            className="w-12 h-12 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 512 512">
                                            <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                                        </svg>
                                    )}
                                </div>
                                <div className='ml-6 flex-1'>
                                    <h3 className='text-xl font-semibold'>{item.title}</h3>
                                    <a 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className='text-blue-600 hover:underline mt-1 block'
                                    >
                                        {item.url}
                                    </a>
                                    <p className='text-gray-500 text-sm mt-2'>
                                        fetched {item.fetchedAt}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default App