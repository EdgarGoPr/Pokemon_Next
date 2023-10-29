import { NextResponse } from "next/server";
import prisma from "../utils/prisma";

const handler = async (req, res) => {
  const { id, email } = req.query
  if (req.method === 'GET') {
    try {
      if (id) {
        const user = await prisma.user.findUnique({ where: { id } })
        return res.status(200).json({ message: 'User fetched successfully', data: user })
      }
      if (email) {
        const user = await prisma.user.findUnique({ where: { email } })
        return res.status(200).json({ message: 'User fetched successfully', data: user })
      }
      const user = await prisma.user.findMany()
      return res.status(200).json({ message: 'Users fetched successfully', data: user })
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'An error occurred while fetching User' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler