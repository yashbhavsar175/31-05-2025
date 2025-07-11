import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';
import url from 'url';
import rateLimit from 'express-rate-limit';
import { db } from "./db.js"
import { link } from './drizzle/schema.js';

const app = express();
app.use(cors());
app.use(express.json());


const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5
});

app.use(limiter);



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
        let { url: pageUrl } = req.body;


        try {
            new URL(pageUrl);
        } catch {
            return res.status(400).json({
                error: 'Invalid URL format',
                title: 'Error',
                url: pageUrl,
                fetchedAt: new Date().toLocaleString()
            });
        }
         

        const response = await axios.get(pageUrl);
        const $ = cheerio.load(response.data);

        const faviconUrl = await getFavicon(pageUrl, $);

        const data = {
            title: $('title').text() || 'No Title Found',
            favicon: faviconUrl,
            url: pageUrl,
            fetchedAt: new Date()
        };
        
        // conn.query(`INSERT INTO link_preview (url, title, favicon_url, fetched_at)
        //     VALUES ($1, $2, $3, $4)`, [data.url,data.title,data.favicon,data.fetchedAt]);

            await db.insert(link).values({
                url: data.url,
                title: data.title,
                favicon_url: data.favicon,
                fetched_at: data.fetchedAt
            });


        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Failed to fetch URL data',
            title: 'Error fetching URL',
            url: req.body.url,
            fetchedAt: new Date()
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
