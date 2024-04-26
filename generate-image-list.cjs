const { google } = require('googleapis');
const apiKey = 'AIzaSyD4rcSHf8lFy8UPfDqKp4MwoXFA3yPulTI';
const folderId = '1TbB_56Zx-nkAz5-Q-AAYmXCwEjygCNJh';
const drive = google.drive({ version: 'v3', auth: apiKey });

const fs = require('fs');
const path =  require('path');


let fileConfig = {
   q: `'${folderId}' in parents AND (mimeType='image/jpeg' OR mimeType='image/png' OR mimeType='video/mp4')`,
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