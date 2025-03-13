const { google } = require('googleapis');
// create a new file, name it ".env", Inside type: GOOGLE_API_KEY="Get the api key from the njrotc account"
// now you can't say I didn't explain
const dotenv = require('dotenv'); dotenv.config();
const folderId = '1TbB_56Zx-nkAz5-Q-AAYmXCwEjygCNJh';
const drive = google.drive({ version: 'v3', auth: process.env.GOOGLE_API_KEY });

const apiKey = process.env.GOOGLE_API_KEY
const fs = require('fs');
const path =  require('path');


let fileConfig = {
   q: `'${folderId}' in parents AND (mimeType='image/jpeg' OR mimeType='image/png' OR mimeType='video/mp4')`,
   pageSize: 30,
   key: apiKey,
   orderBy: 'createdTime desc' // This Makes it to Youngest to Oldest
};

let currentPageToken = null;
let previousPageTokens = [];
let PageNumber = 0
let GalleryData = [

]

async function CreatePage(token = null) {
   console.log("PHOTOS PAGE "+`${PageNumber}`+" MADE")

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
            page.images.push(file.id)
      });
      GalleryData.push(page)
      PageNumber++
   }
   if (response.data.nextPageToken) {
      await CreatePage(response.data.nextPageToken)
   }
   
}


async function main(){
   await CreatePage();

   

   fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'gallery.json'), JSON.stringify(GalleryData, null, 2), err => {
      if (err) {
        console.error('Failure due to:', err);
      }
   });

}



main()