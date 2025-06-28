exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, filename, size, mimetype, path } = req.file;

  res.json({
    message: 'File uploaded successfully',
    fileInfo: {
      originalName: originalname,
      storedName: filename,
      size,
      mimetype,
      path
    }
  });
};