const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const url = require('url');

const app = express();
app.use(cors());
app.use(express.json());

const getFavicon = async (pageUrl, $) => {
    try {
        const parsedUrl = url.parse(pageUrl);
        const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
        
        const faviconSelectors = [
            'link[rel="icon"]',
            'link[rel="shortcut icon"]',
            'link[rel="apple-touch-icon"]',
            'link[rel="apple-touch-icon-precomposed"]'
        ];

        for (const selector of faviconSelectors) {
            const faviconElement = $(selector);
            if (faviconElement.length > 0) {
                let faviconUrl = faviconElement.attr('href');
                
                if (faviconUrl && !faviconUrl.startsWith('http')) {
                    if (faviconUrl.startsWith('//')) {
                        faviconUrl = 'https:' + faviconUrl;
                    } else if (faviconUrl.startsWith('/')) {
                        faviconUrl = baseUrl + faviconUrl;
                    } else {
                        faviconUrl = baseUrl + '/' + faviconUrl;
                    }
                }
                return faviconUrl;
            }
        }

        const defaultFaviconUrl = `${baseUrl}/favicon.ico`;
        const response = await axios.get(defaultFaviconUrl);
        if (response.status === 200) {
            return defaultFaviconUrl;
        }
    } catch (error) {
        console.log('Favicon fetch error:', error);
    }

    return null;
};

app.post('/fetch-url', async (req, res) => {
    try {
        const { url: pageUrl } = req.body;
        
        if (!pageUrl) {
            return res.status(400).json({ 
                error: 'URL is required',
                title: 'Error',
                url: '',
                fetchedAt: new Date().toLocaleString()
            });
        }

        const response = await axios.get(pageUrl);
        const $ = cheerio.load(response.data);
        
        const faviconUrl = await getFavicon(pageUrl, $);

        const data = {
            title: $('title').text() || 'No Title Found',
            description: $('meta[name="description"]').attr('content') || 
                        $('meta[property="og:description"]').attr('content') || 
                        'No Description Found',
            favicon: faviconUrl,
            url: pageUrl,
            fetchedAt: new Date().toLocaleString()
        };
        
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch URL data',
            title: 'Error fetching URL',
            url: req.body.url,
            fetchedAt: new Date().toLocaleString()
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});