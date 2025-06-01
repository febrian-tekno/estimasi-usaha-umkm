const path = require('path');
const fs = require('fs').promises;

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

class UploadImageService {
  static async saveImage(file) {
    if (!file) throw new Error('No file provided');
    const imageUrl = `/uploads/${file.filename}`;
    return {
      filename: file.filename,
      path: file.path,
      imageUrl,
    };
  }

  static async deleteImage(filename) {
    try {
      const filePath = path.join(UPLOAD_DIR, filename);
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      console.error('Failed to delete image:', error.message);
      return false;
    }
  }
}

module.exports = UploadImageService;
