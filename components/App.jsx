import './App.css'

const frontForm = ()=> {
    const [url, setUrl] = useState({
        url: "" 
    });
}
const PostData = async (e) => {
    e.preventDefault();
    const { url } = url;

}


function App() {
    return (
        <div className='flex items-center justify-center h-screen bg-gray-900'>
            <div className=' bg-white p-7'>
                <div>
                    <h1 className=' text-4xl font-bold'>Link Preview Dashboard</h1>
                </div>
                <div className='flex  mt-10 '>
                    <input className='fetch_url pr-48 border-2' placeholder='Enter a URL here' />
                    <button type="button" onClick={PostData} className='ml-5 bg-blue-600 text-amber-50 flex justify-center items-center p-1 rounded-md'><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"> <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg> Preview</button>
                </div>


                <div>
                    <h1>Previously Submitted Links</h1>
                </div>
                <div className='border-2'>
                    <div className='flex items-center justify-center gap-4'>
                        <div className='image'>
                            <img src="" alt="" /><svg xmlns="http://www.w3.org/2000/svg" height="60" width="70" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" /></svg>
                        </div>
                        <div>
                            <br /><br />
                            <h1>Example Domain.</h1>
                            <p>This domain is for use in illustrative examples</p>
                            <p>http://example.com</p>
                            <p>fetched May 30, 2025 , 14:05</p>
                            <br /><br /><hr />
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <div>
                            <img src="" alt="" /><svg xmlns="http://www.w3.org/2000/svg" height="60" width="70" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" /></svg>
                        </div>
                        <div>
                            <br /><br />
                            <h1>Example Domain.</h1>
                            <p>This domain is for use in illustrative examples</p>
                            <p>http://example.com</p>
                            <p>fetched May 30, 2025 , 14:05</p>
                            <br /><br /><hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
