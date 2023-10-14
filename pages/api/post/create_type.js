import prisma from "../utils/prisma";

export default async function handler(req, res) {
  const { data } = req.body
  if (req.method === 'POST') {
    try {
      const type = await prisma.type.create({ data: data })
      res.status(200).json({ message: 'Type created successfully', data: type })
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'An error occurred while creating Type' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
