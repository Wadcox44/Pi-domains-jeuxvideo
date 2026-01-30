const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { paymentId } = req.body;
  // REMPLACE PAR TA CLÉ SECRÈTE DU PORTAIL PI
  const PI_API_KEY = "TA_SERIE_DE_CHIFFRES_ET_LETTRES"; 

  try {
    // On dit à Pi que le paiement est validé par ton serveur
    await axios.post(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {}, {
      headers: { Authorization: `Key ${PI_API_KEY}` }
    });
    return res.status(200).json({ message: "Approuvé par le serveur de wadcox !" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
