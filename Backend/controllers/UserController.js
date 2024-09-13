import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const JWT_SECRET = 'imad';
// Inscription
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Utilisateur déjà enregistré.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Connexion
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect.' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role , address : user.address , phone : user.phone } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mise à jour du profil utilisateur
export const updateProfile = async (req, res) => {
  const { name, email, phone, address } = req.body;
  const userId = req.params.id;  // L'ID de l'utilisateur sera passé dans l'URL

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    // Mise à jour des informations
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    
    await user.save();
    res.status(200).json({ message: 'Informations de profil mises à jour avec succès.', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};