const Url = require('../Schemas/urlSchema');
const logRequest = require('../../Logging_Middleware/index.js');

function generateShortId() {
  return Math.random().toString(36).substring(2, 8);
}

exports.shortenUrl = async (req, res) => {
  let { origin, validity, shortcode } = req.body;
  if (!origin) {
    await logRequest('backend', 'error', 'controller', 'Origin URL missing');
    return res.status(400).json({ error: 'Origin URL is required' });
  }

  if (!/^https?:\/\//i.test(origin)) {
    origin = 'http://' + origin;
  }

  let shortId = shortcode ? String(shortcode) : generateShortId();

  while (await Url.findOne({ shortId })) {
    if (!shortcode) shortId = generateShortId();
    else {
      await logRequest('backend', 'error', 'controller', 'Shortcode not unique');
      return res.status(409).json({ error: 'Custom shortcode already in use.' });
    }
  }

  const mins = typeof validity === 'number' ? validity : 30;
  const expiry = new Date(Date.now() + mins * 60 * 1000);

  try {
    console.log(`Shortening URL: ${origin} with shortId: ${shortId}`);
    const url = await Url.create({ origin, shortId, expiry });
    await logRequest('backend', 'info', 'controller', `Shortened: ${shortId}`);
    res.status(201).json({
      shortLink: `http://localhost:3000/${shortId}`,
      expiry: url.expiry.toISOString()
    });
  } catch (err) {
    await logRequest('backend', 'error', 'controller', err.message);
    res.status(500).json({ error: 'Failed to shorten URL.' });
  }
};

exports.getOriginalUrl = async (req, res) => {
  const { shortId } = req.params;
  console.log(shortId);
  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    if (url.expiry < new Date())
      return res.status(410).json({ error: 'URL expired' });

    url.clicks += 1;
    url.clickDetails.push({
      timestamp: new Date(),
      referrer: req.get('referer') || '',
      geo: req.ip || ''
    });
    await url.save();
    await logRequest('backend', 'info', 'controller',` Redirect ${shortId}`);
    res.redirect(url.origin);
  } catch (err) {
    await logRequest('backend', 'error', 'controller', err.message);
    res.status(500).json({ error: 'Failed to retrieve URL.' });
  }
};
exports.getDetailsById = async (req, res) => {
  const { id: shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    res.status(200).json({
      shortId: url.shortId,
      origin: url.origin,
      shortLink: `http://localhost:3000/${url.shortId}`,
      createdAt: url.createdAt.toISOString(),
      expiry: url.expiry.toISOString(),
      clicks: url.clicks,
      clickDetails: url.clickDetails.map(item => ({
        timestamp: item.timestamp?.toISOString?.() || '',
        referrer: item.referrer || '',
        geo: item.geo || ''
      }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get URL details.' });
  }
};