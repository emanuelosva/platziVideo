import fs from 'fs';

const getManifest = () => {
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`));
  } catch (error) {
    console.error(`[getManifest] -> ${error}`);
  }
  return manifest;
};

const manifestMiddleware = (req, res, next) => {
  if (!req.hashManifest) req.manifestMiddleware = getManifest();
  next();
};

module.exports = manifestMiddleware;
