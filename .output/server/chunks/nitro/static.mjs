import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';
import { c as buildAssetsDir } from './server.mjs';
import 'unenv/runtime/polyfill/fetch.node';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'defu';

const assets = {
  "/_nuxt/bootstrap-52cae37f.mjs": {
    "type": "application/javascript",
    "etag": "\"12f51-969lc5lHQHAMyRwGlshKwXXHFrQ\"",
    "mtime": "2022-02-15T05:47:00.157Z",
    "path": "../public/_nuxt/bootstrap-52cae37f.mjs"
  },
  "/_nuxt/bootstrap.bcc7f2f7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1718-BjZL6A3C+NcHWvpXajYZwO9Iz9E\"",
    "mtime": "2022-02-15T05:47:00.156Z",
    "path": "../public/_nuxt/bootstrap.bcc7f2f7.css"
  },
  "/_nuxt/entry-733a1dab.mjs": {
    "type": "application/javascript",
    "etag": "\"47-o4o4Fs4bnnt13ujnB4XlBN/Lnbk\"",
    "mtime": "2022-02-15T05:47:00.156Z",
    "path": "../public/_nuxt/entry-733a1dab.mjs"
  },
  "/_nuxt/food.0c705e89.jpg": {
    "type": "image/jpeg",
    "etag": "\"e96e-82z+I6oeBuCtqXjYzJAp10pg7T0\"",
    "mtime": "2022-02-15T05:47:00.155Z",
    "path": "../public/_nuxt/food.0c705e89.jpg"
  },
  "/_nuxt/logo-buah.34ff40ba.png": {
    "type": "image/png",
    "etag": "\"59fe7-BkMG9BXS/sFN/rob2b+guz3PIrU\"",
    "mtime": "2022-02-15T05:47:00.155Z",
    "path": "../public/_nuxt/logo-buah.34ff40ba.png"
  },
  "/_nuxt/logo-catering.ca1848ce.png": {
    "type": "image/png",
    "etag": "\"5d6b2-0h8O97sI2Bi+ejvWx5HQWWhzxxw\"",
    "mtime": "2022-02-15T05:47:00.154Z",
    "path": "../public/_nuxt/logo-catering.ca1848ce.png"
  },
  "/_nuxt/logo-kafe.e56ffd90.png": {
    "type": "image/png",
    "etag": "\"596ca-YMy5Jj5issAxOxZs09+FFCRB0Tc\"",
    "mtime": "2022-02-15T05:47:00.154Z",
    "path": "../public/_nuxt/logo-kafe.e56ffd90.png"
  },
  "/_nuxt/logo-wisata.a7de6fd4.png": {
    "type": "image/png",
    "etag": "\"5aa4a-iGaN46MMWQrHCdzY+CXkJOcoUng\"",
    "mtime": "2022-02-15T05:47:00.153Z",
    "path": "../public/_nuxt/logo-wisata.a7de6fd4.png"
  },
  "/_nuxt/logo.d545743f.png": {
    "type": "image/png",
    "etag": "\"538fb-WXuxV8l5kqNygI0+NdUVHRE+NUQ\"",
    "mtime": "2022-02-15T05:47:00.152Z",
    "path": "../public/_nuxt/logo.d545743f.png"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"2a3-FXiqNeJ41IFZXkRDH4Kv9t+Ik7A\"",
    "mtime": "2022-02-15T05:47:00.151Z",
    "path": "../public/_nuxt/manifest.json"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));

function readAsset (id) {
  return promises.readFile(resolve(mainDir, getAsset(id).path))
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "/_nuxt/Users/ahmadrifqib/Developer/arsya-group/dist" + "/" + "1644904017";
async function serveStatic(req, res) {
  if (!METHODS.includes(req.method)) {
    return;
  }
  let id = withLeadingSlash(withoutTrailingSlash(parseURL(req.url).pathname));
  let asset = getAsset(id);
  if (!asset) {
    const _id = id + "/index.html";
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
    }
  }
  const isBuildAsset = id.startsWith(buildAssetsDir());
  if (!asset) {
    if (isBuildAsset && !id.startsWith(STATIC_ASSETS_BASE)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    res.statusCode = 304;
    return res.end("Not Modified (etag)");
  }
  const ifModifiedSinceH = req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      res.statusCode = 304;
      return res.end("Not Modified (mtime)");
    }
  }
  if (asset.type) {
    res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    res.setHeader("Last-Modified", asset.mtime);
  }
  if (isBuildAsset) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };
