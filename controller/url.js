const Url = require('../model/Url');

const redirectToOriginalUrl = async (req, res) => {
  try {
    const { url } = req.params;
    //@ts-nocheckconsole.log(url);
    const shortUrl = await Url.findOne({ urlCode: url });
    console.log(shortUrl);
    if (shortUrl) {
      return res.redirect(shortUrl.longUrl);
    } else {
      return res.status(401).json('No Url Found');
    }
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error);
  }
};

module.exports = { redirectToOriginalUrl };
