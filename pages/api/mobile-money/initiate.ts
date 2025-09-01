
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, phoneNumber, network, userId } = req.body;

    // Basic validation
    if (!amount || !phoneNumber || !network || !userId) {
      return res.status(400).json({ error: 'Missing required fields for mobile money payment.' });
    }

    // In a real application, you would integrate with the mobile money provider's API.
    // This is a placeholder for demonstration purposes.
    console.log(`Initiating mobile money payment for ${amount} to ${phoneNumber} via ${network}.`);
    
    // Simulate a successful initiation
    res.status(200).json({
      status: 'initiated',
      transactionId: `mm_mock_${Date.now()}`,
      providerReference: `prov_mock_${Date.now()}`
    });

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
