module.exports = (req, res) => {
  res.json({ ok: true, env: !!process.env.PG_HOST, host: process.env.PG_HOST })
}
