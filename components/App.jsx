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

        } catch (err) {
            if (response.status == 429) {
                alert('Rate limit exceeded. Please try again later.',err);
            } else {
                alert('An error occurred while fetching the URL. Please try again.',err);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4'>
            <div className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl'>
                <div>
                    <h1 className='text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800'>Link Preview Dashboard</h1>
                </div>
                <form onSubmit={PostData} className='flex flex-col sm:flex-row items-center gap-4 mb-10'>
                    <input 
                        className='flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition w-full sm:w-auto' 
                        placeholder='Enter a URL here'
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className={`flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512" className="mr-2">
                            <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                        {loading ? 'Loading...' : 'Preview'}
                    </button>
                </form>

                <div>
                    <h2 className='text-2xl font-semibold mb-6 text-gray-700'>Previously Submitted Links</h2>
                    <div className='border border-gray-200 rounded-lg shadow-sm'>
                        {urlList.length === 0 ? (
                            <div className='p-6 text-center text-gray-400'>
                                No links submitted yet
                            </div>
                        ) : (
                            urlList.map((item, index) => (
                                <div key={index} className='flex flex-col sm:flex-row items-center p-6 border-b last:border-b-0 gap-4'>
                                    <div className='flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center'>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 512 512" className="text-gray-400">
                                                <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className='flex-1 text-center sm:text-left'>
                                        <h3 className='text-xl font-semibold text-gray-800'>{item.title}</h3>
                                        <a 
                                            href={item.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className='text-blue-600 hover:underline break-all block mt-1'
                                        >
                                            {item.url}
                                        </a>
                                        <p className='text-gray-400 text-sm mt-2'>
                                            fetched {item.fetchedAt}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
