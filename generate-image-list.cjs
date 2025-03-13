const { google } = require('googleapis');
const dotenv = require('dotenv'); 
dotenv.config();
const fs = require('fs');
const path =  require('path');

const drive = google.drive({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY 
});

const folderId = '1TbB_56Zx-nkAz5-Q-AAYmXCwEjygCNJh';
let PageNumber = 0;
const GalleryData = [];

const fileConfig = {
  q: `'${folderId}' in parents AND (mimeType='image/jpeg' OR mimeType='image/png' OR mimeType='video/mp4')`,
  pageSize: 30,
  fields: 'nextPageToken, files(id, mimeType)'
};

async function CreatePage(token = null) {
  try {
    const params = token ? { ...fileConfig, pageToken: token } : fileConfig;
    const response = await drive.files.list(params);
    
    const page = {
      slug: `Page-${PageNumber + 1}`,
      page: PageNumber + 1,
      images: response.data.files.map(file => ({
        id: file.id,
        url: `https://lh3.googleusercontent.com/d/${file.id}`,
        type: file.mimeType.split('/')[1] // 'jpeg', 'png', or 'mp4'
      }))
    };

    GalleryData.push(page);
    PageNumber++;

    if (response.data.nextPageToken) {
      await CreatePage(response.data.nextPageToken);
    }
  } catch (error) {
    console.error('Error fetching files:', error.message);
    throw error;
  }
}

async function main() {
  try {
    await CreatePage();
    
    const outputPath = path.join(process.cwd(), 'src', 'data', 'gallery.json');
    fs.writeFileSync(outputPath, JSON.stringify(GalleryData, null, 2));
    console.log('Gallery data successfully generated!');
    
  } catch (error) {
    console.error('Process failed:', error);
    process.exit(1);
  }
}

main();