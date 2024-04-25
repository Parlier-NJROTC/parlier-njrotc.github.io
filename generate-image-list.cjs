const { google } = require('googleapis');
const apiKey = 'AIzaSyD4rcSHf8lFy8UPfDqKp4MwoXFA3yPulTI';
const folderId = '1TbB_56Zx-nkAz5-Q-AAYmXCwEjygCNJh';
const drive = google.drive({ version: 'v3', auth: apiKey });

const fs = require('fs');
const path =  require('path');


let fileConfig = {
   q: `'${folderId}' in parents`,
   pageSize: 30,
   key: apiKey
};

let currentPageToken = null;
let previousPageTokens = [];
let PageNumber = 0
let GalleryData = [

]

async function CreatePage(token = null) {

   let page = {
      slug: `Page-${PageNumber + 1}`,
      page: PageNumber + 1,
      images: []
   }
   if(token){
      fileConfig.pageToken = token
   }
   const response = await drive.files.list(fileConfig);
   
   const files = response.data.files;
   if (files.length) { 
      files.forEach(file => {
            // has to be in this format: https://lh3.googleusercontent.com/d/${file.id}
            page.images.push(`https://lh3.googleusercontent.com/d/${file.id}`)
      });
      GalleryData.push(page)
      PageNumber++
   }
   if (response.data.nextPageToken) {
      return response.data.nextPageToken;
   }
   
}


async function main(){
   let token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);
   token = await CreatePage();
   await CreatePage(token);

   

   fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'gallery.json'), JSON.stringify(GalleryData, null, 2), err => {
      if (err) {
        console.error('Failure due to:', err);
      }
   });

}



main()





/*



const { google } = require('googleapis');

// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'AIzaSyD4rcSHf8lFy8UPfDqKp4MwoXFA3yPulTI';

// Replace 'your-folder-id' with the actual ID of the public folder
const folderId = '1TbB_56Zx-nkAz5-Q-AAYmXCwEjygCNJh';

// Initialize the Google Drive API client
const drive = google.drive({ version: 'v3', auth: apiKey });

// Configure the request to list files in the public folder
let fileConfig = {
 q: `'${folderId}' in parents`,
 pageSize: 1000, // Maximum allowed
};

async function listAllFiles(pageToken) {
 if (pageToken) {
    fileConfig.pageToken = pageToken;
 }

 const response = await drive.files.list(fileConfig);
 const files = response.data.files;
 if (files.length) {
    console.log('Files:');
    files.forEach(file => {
      console.log(`${file.name} (${file.id})`);
    });
 } else {
    console.log('No files found.');
 }

 if (response.data.nextPageToken) {
    // Recursively fetch the next page of files
    listAllFiles(response.data.nextPageToken);
 }
}

listAllFiles().catch(console.error);










/*
// Ensure you have node-fetch installed 
// sudo npm install node-fetch
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const outputFile = path.join(process.cwd(), 'src', 'data', 'gallery.json');


const owner = 'Parlier-NJROTC';
const repo = 'Gallery';

async function fetchFiles(owner, repo) {
 const url = `https://api.github.com/repos/${owner}/${repo}/contents`;
 const response = await fetch(url);
 const data = await response.json();
 return data.map(file => file.name);
}




async function generateImageList() {
 const files = await fetchFiles(owner, repo);
 // of course its case sensative
 const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.JPG') || file.endsWith('.PNG') || file.endsWith('.JPEG')); // Adjust the filter as needed
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
 // no idea why it didn't log
 let failed = false

 fs.writeFileSync(outputFile, JSON.stringify(galleryData, null, 2), err => {
   if (err) {
     console.error('Failure due to:', err);
     failed = true
     
   } else {
     failed = false
   }
  });
  if(!failed){
    console.log("Gallery JSON generated successfully")
  }
}

generateImageList().catch((reason)=>{
    console.log(`This thing failed because: ${reason}`);
});
*/