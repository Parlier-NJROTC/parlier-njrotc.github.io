
// Ensure you have node-fetch installed
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const outputFile = path.join(process.cwd(), 'src', 'data', 'gallery.json');

// Replace with your repository details
const owner = 'Parlier-NJROTC';
const repo = 'Gallery';

// Function to fetch the list of files in the repository
async function fetchFiles(owner, repo) {
 const url = `https://api.github.com/repos/${owner}/${repo}/contents`;
 const response = await fetch(url);
 const data = await response.json();
 return data.map(file => file.name);
}




// Function to generate the JSON file
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
    for(let o = 0;o < pageImages.length;o++){
      pageImages[o] = `https://raw.githubusercontent.com/${owner}/${repo}/main/${pageImages[o]}`
    }
    const pageData = {
        slug: `Page-${i+1}`,
        pageNumber: i + 1,
        images: pageImages,
    };
    galleryData.push(pageData);
 }



 /**
  * const imageList = images.map(image => ({
    src: `https://raw.githubusercontent.com/${owner}/${repo}/main/${image}`,
    alt: image,
 }));
  */

 fs.writeFileSync(outputFile, JSON.stringify(galleryData, null, 2), err => {
   if (err) {
     console.error('Ah what the heck:', err);
   } else {
     console.log(`Whoo hooo, we didn't spontaniously fail `);
   }
});
}

generateImageList().catch(console.error);


/*
import fs from 'fs';
import path from 'path';

const galleryPath = path.join(process.cwd(), 'public', 'gallery');
const outputFile = path.join(process.cwd(), 'src', 'data', 'gallery.json');

// script to make json file to not go to reapeat nightmare
// ok that is a bug

fs.readdir(galleryPath, (err, files) => {
 if (err) {
    console.error('Error reading directory:', err);
    return;
 }

 const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png')|| file.endsWith('.jpeg'));
 const pageSize = 30; // adjust
 const numberOfPages = Math.ceil(images.length / pageSize);

 const galleryData = [];


 for (let i = 0; i < numberOfPages; i++) {
    const start = i * pageSize;
    const end = start + pageSize;
    const pageImages = images.slice(start, end);
    const pageData = {
        slug: `Page-${i+1}`,
        pageNumber: i + 1,
        images: pageImages,
    };
    galleryData.push(pageData);
 }

 fs.writeFile(outputFile, JSON.stringify(galleryData, null, 2), err => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Gallery JSON generated successfully.');
    }
 });
});*/
