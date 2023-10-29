import prisma from "../utils/prisma";

export default async function handler(req, res) {
  const { data } = req.body
  if (req.method === 'POST') {
    try {
      const user = await prisma.user.create({ data: data })
      res.status(200).json({ message: 'User created successfully', data: {...user, fav: []} })
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'An error occurred while creating User' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
