require('dotenv').config();
const Url = require('../model/Url');
const validUrl = require('valid-url');
const shortId = require('shortid');

const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    const baseUrl = process.env.baseUrl;

    if (!validUrl.isUri(baseUrl)) {
      return res.status(401).json('invalid baseurl');
    }

    const urlCode = shortId.generate();

    if (validUrl.isUri(longUrl)) {
      let url = await Url.findOne({ longUrl });
      if (url) {
        return res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;
        url = new Url({
          urlCode,
          longUrl,
          shortUrl,
          date: Date.now(),
        });

        await url.save();
        return res.status(201).json(shortUrl);
      }
    } else {
      return res.json('invalid lonurl');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
};

// const redirectToOriginalUrl = async (req, res) => {
//   try {
//     const { url } = req.params;
//     const shortUrl = await Url.findOne({ urlCode: url });
//     if (shortUrl) {
//       return res.redirect(shortUrl.longUrl);
//     } else {
//       return res.status(401).json('No Url Found');
//     }
//   } catch (error) {
//     res.status(500).json(error.message);
//     console.log(error);
//   }
// };

module.exports = { shortenUrl };
