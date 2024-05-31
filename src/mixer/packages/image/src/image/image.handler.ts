import { IncomingHttpHeaders } from 'http';
// Importing the 'fs' module to work with the file system
import * as fs from 'fs';
// Importing the 'NextApiRequest' and 'NextApiResponse' from 'next' for handling API requests and responses
import { NextApiRequest, NextApiResponse } from 'next';
// Importing the 'path' module to work with file and directory paths
import * as path from 'path';
// Importing 'sharp' for image processing
import sharp from 'sharp';
// Importing 'apiHandler' from '../api/api.handler'
import { apiHandler } from '../api/api.handler';

const IMAGE_MAX_AGE = 604800;

// Exporting the 'imageHandler' function
export function imageHandler({ domains = [] }: { domains: string[] }) {
  // Returning the 'apiHandler' function with a configuration object
  return apiHandler({
    // Defining the 'get' method for handling GET requests
    get: async (request: NextApiRequest, response: NextApiResponse) => {
      try {
        // Destructuring 'url', 'w', 'h', 'q' from the request query
        const { url, w, h, q } = request.query;
        // Checking if 'url' is not a string
        if (typeof url !== 'string') {
          // Logging an error message and returning a 400 status code with a message
          // console.error('imageHandler', 'missing url parameter');
          return response.status(400).send('missing url parameter');
        }
        // Parsing 'w' to an integer and assigning it to 'width'
        const width = typeof w === 'string' ? parseInt(w) : undefined;
        // Checking if 'width' is not defined
        if (!width) {
          // Logging an error message and returning a 400 status code with a message
          // console.error('imageHandler', 'missing w parameter');
          return response.status(400).send('missing w parameter');
        }
        if (width > 2048) {
          return response.status(400).send('invalid w parameter');
        }
        // Parsing 'h' to an integer and assigning it to 'height'
        const height = typeof h === 'string' ? parseInt(h) : undefined;
        // Parsing 'q' to an integer, ensuring it's between 30 and 100, and assigning it to 'quality'
        const quality = Math.max(30, Math.min(100, (typeof q === 'string' ? parseInt(q) : 80)));
        // Generating a cached name for the image
        const cachedName = urlToCachedName(url, width, height, quality);
        // Checking if the cached image exists
        if (fs.existsSync(cachedName)) {
          // console.log('imageHandler.fromCache', cachedName);
          // Reading the cached image
          const cachedImage = await getCachedImage(cachedName);
          // Setting the 'Content-Type' header to 'image/webp'
          response.setHeader('Content-Type', 'image/webp');
          // Setting the 'Expires' header to the current time plus the maximum age of the image (in seconds)
          response.setHeader('Expires', new Date(Date.now() + IMAGE_MAX_AGE * 1000).toUTCString());
          // Setting the 'Cache-Control' header to 'public' and setting 'max-age' to the maximum age of the image
          response.setHeader('Cache-Control', `public, max-age=${IMAGE_MAX_AGE}`);
          // Ending the response and sending the cached image
          return response.send(cachedImage);
        }
        // Temporarily fix Vercel local image issue
        if (url.indexOf('http') === -1 && isVercel()) {
          response.redirect(307, url);
        }
        // Reading the original image
        const originalImage = await getOriginalImage(url, domains, request.headers);
        // Checking if the original image exists
        if (originalImage) {
          // Resizing the original image and converting it to WebP format
          const resizedImage = sharp(originalImage)
            .resize({
              width,
              height: height ? height : undefined,
              fit: sharp.fit.cover,
              position: sharp.strategy.entropy,
              withoutEnlargement: true,
            })
            .webp({
              quality,
              // nearLossless: true,
            });
          // Saving the resized image to the cache
          resizedImage.toFile(cachedName)
            .then(() => console.log('imageHandler.sharp.cached', cachedName))
            .catch((error: any) => console.error('error caching image', cachedName, error));
          // Converting the resized image to a buffer and sending it in the response
          const data = await resizedImage.toBuffer();
          // Setting the 'Content-Type' header to 'image/webp'
          response.setHeader('Content-Type', 'image/webp');
          // Setting the 'Expires' header to the current time plus the maximum age of the image (in seconds)
          response.setHeader('Expires', new Date(Date.now() + IMAGE_MAX_AGE * 1000).toUTCString());
          // Setting the 'Cache-Control' header to 'public' and setting 'max-age' to the maximum age of the image
          response.setHeader('Cache-Control', `public, max-age=${IMAGE_MAX_AGE}`);
          return response.end(data);
        }
      } catch (error) {
        // Logging an error message and throwing the error
        console.error('imageHandler.error', error);
        throw error;
      }
    },
  });
}

// Defining the 'getOriginalImage' function
function getOriginalImage(url: string, domains: string[], headers: IncomingHttpHeaders, skipUrlValidity: boolean = false): Promise<Buffer> {
  // Returning a new promise
  return new Promise((resolve, reject) => {
    // Checking if 'url' starts with 'http'
    if (url.indexOf('http') === 0) {
      if (
        !skipUrlValidity &&
        !checkUrlValidity(url, domains)
      ) {
        console.error('imageHandler.getOriginalImage.error invalid url');
        return reject({ status: 401, message: 'invalid url' });
      }
      // Fetching the image from the URL
      fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then(response => {
          if (!response.ok) {
            return reject({ status: response.status, message: response.statusText });
          }
          response.arrayBuffer().then(buffer => {
            return resolve(Buffer.from(buffer));
          }).catch(error => {
            return reject(error);
          });
        })
        .catch(error => {
          // Rejecting the promise with the error
          return reject(error);
        });
    } else {
      // Reading the image from the file system
      const filePath = path.join(process.cwd(), 'public', url);
      // console.log('imageHandler.getOriginalImage.filePath', filePath);
      fs.readFile(filePath, (error, data) => {
        if (error) {
          return reject(error);
        }
        // Resolving the promise with the image data
        return resolve(data);
      });
      /*
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (error, data) => {
          if (error) {
            return reject(error);
          }
          // Resolving the promise with the image data
          return resolve(data);
        });
      } else {
        const origin = getOrigin(headers);
        return getOriginalImage(`${origin}${url}`, domains, headers, true);
      }
      */
    }
  });
}

// Defining the 'getCachedImage' function
function getCachedImage(pathname: string): Promise<Buffer> {
  // Returning a new promise
  return new Promise((resolve, reject) => {
    // Reading the image from the file system
    fs.readFile(pathname, (error, data) => {
      if (error) {
        // Rejecting the promise with the error
        return reject(error);
      }
      // Resolving the promise with the image data
      return resolve(data);
    });
  });
}

// Defining the 'urlToFileName' function
function urlToFileName(url: string): string {
  // Replacing useless characters with UNDERSCORE
  let uniqueName = url.replace('://', '_').replace('.', '_').replace('/', '_');
  // Replacing last UNDERSCORE with a DOT
  uniqueName = uniqueName.substring(0, uniqueName.lastIndexOf('_'))
    + '.' + uniqueName.substring(uniqueName.lastIndexOf('_') + 1, uniqueName.length);
  // Returning the unique name
  return uniqueName;
}

function isVercel(): boolean {
  return process && process.env && String(process.env.VERCEL) === '1';
}

// Defining the 'urlToCachedName' function
function urlToCachedName(url: string, width: number, height: number | undefined, quality: number): string {
  // Converting the URL to a file name
  const fileName = urlToFileName(url);
  // Parsing the file name
  const parsedName = path.parse(fileName);
  // Defining the cache directory
  const cacheDir = isVercel() ?
    path.join('/tmp', '.cache') :
    path.join(process.cwd(), '.cache');
  // Checking if the cache directory exists
  if (!fs.existsSync(cacheDir)) {
    // Creating the cache directory
    fs.mkdirSync(cacheDir);
  }
  // Generating the cached name
  const cachedName = path.join(cacheDir, `${parsedName.name}_w_${width}_h_${height || 0}_q_${quality}${parsedName.ext}`);
  // Returning the cached name
  return cachedName;
}

function checkUrlValidity(src: string, domains: string[]): boolean {
  const url = new URL(src);
  return domains.includes(url.hostname);
}
