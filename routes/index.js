const express = require('express');
//const Url = require('../model/Url');
const router = express.Router();
const urlCtrl = require('../controller/urlCtrl');
const urlRd = require('../controller/url');

router.route('/').post(urlCtrl.shortenUrl);
router.route('/').get(urlRd.redirectToOriginalUrl);

// router.get('/', async (req, res) => {
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
// });

module.exports = router;
