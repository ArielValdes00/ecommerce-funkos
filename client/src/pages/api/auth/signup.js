import bcrypt from 'bcrypt';
import User from '../../../models/apiUsers';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, areaCode, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        name,
        email,
        areaCode,
        phoneNumber,
        password: hashedPassword,
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
