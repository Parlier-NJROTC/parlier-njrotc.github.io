import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const outputFile = path.join(process.cwd(), 'src', 'data', 'gallery.json');

const owner = 'Parlier-NJROTC';
const repo = 'Gallery';

async function fetchFiles(owner, repo, path = '') {
 const url = `https://api.github.com/repos/${owner}/${repo}/contents/Image`;
 const response = await fetch(url);
 const data = await response.json();

 let files = [];
 for (const item of data) {
    if (item.type === 'dir') {
      const subFiles = await fetchFiles(owner, repo, item.path);
      files = files.concat(subFiles);
      console.log(`Image Folder Found! `);
    } else if (item.type === 'file') {
      files.push(item.path); 
    }
 }
 return files;
}

async function generateImageList() {
 const files = await fetchFiles(owner, repo);
 const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')); // Adjust the filter as needed
 const pageSize = 30; // adjust
 const numberOfPages = Math.ceil(images.length / pageSize);

 const galleryData = [];

 for (let i = 0; i < numberOfPages; i++) {
    const start = i * pageSize;
    const end = start + pageSize;
    const pageImages = images.slice(start, end);
    for(let o = 0; o < pageImages.length; o++){
      pageImages[o] = `https://raw.githubusercontent.com/${owner}/${repo}/main/${pageImages[o]}`
    }
    const pageData = {
        slug: `Page-${i+1}`,
        pageNumber: i + 1,
        images: pageImages,
    };
    galleryData.push(pageData);
 }

 try {
    fs.writeFileSync(outputFile, JSON.stringify(galleryData, null, 2));
    console.log(`Whoo hooo, we didn't spontaniously fail `);
 } catch (err) {
    console.error('Ah what the heck:', err);
 }
}

generateImageList().catch(console.error);
