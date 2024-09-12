import Coupon from "../models/Coupon.js";

// Créer un nouveau coupon (admin)
export const createCoupon = async (req, res) => {
  try {
    const { code, discountAmount, expiryDate } = req.body;

    const newCoupon = new Coupon({
      code,
      discountAmount,
      expiryDate,
      isActive: true,
    });

    await newCoupon.save();
    res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ message: "Error creating coupon", error });
  }
};

// Appliquer un coupon
export const applyCoupon = async (req, res) => {
  const { code } = req.body;

  try {
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(400).json({ valid: false, message: 'Coupon non trouvé.' });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ valid: false, message: 'Le coupon n\'est plus actif.' });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ valid: false, message: 'Le coupon a expiré.' });
    }

    res.status(200).json({ valid: true, discount: coupon.discountAmount });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Supprimer un coupon (admin)
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    await Coupon.findByIdAndDelete(id);
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting coupon", error });
  }
};

// Modifier un coupon (admin)
export const updateCoupon = async (req, res) => {
    try {
      const { id } = req.params;
      const { code, discountAmount, expiryDate, isActive } = req.body;
  
      const updatedCoupon = await Coupon.findByIdAndUpdate(
        id,
        { code, discountAmount, expiryDate, isActive },
        { new: true, runValidators: true }
      );
  
      if (!updatedCoupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
  
      res.status(200).json({ message: 'Coupon updated successfully', coupon: updatedCoupon });
    } catch (error) {
      res.status(500).json({ message: 'Error updating coupon', error });
    }
  };

  // Récupérer tous les coupons (admin)
export const getCoupons = async (req, res) => {
    try {
      const coupons = await Coupon.find();
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: "Error fetching coupons", error });
    }
  };
