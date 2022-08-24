import type { NextApiRequest, NextApiResponse } from 'next';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method);
  switch (req.method) {
    case 'GET':
      res.status(200).json({ msg: 'Hello, World' });
      return;
    case 'POST':
      return res.json({ res: 'Created' });
    case 'PUT':
      res.status(200).json({ res: 'Updated' });
      return;
  }
};

export default handle;
