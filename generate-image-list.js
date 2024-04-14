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
});
