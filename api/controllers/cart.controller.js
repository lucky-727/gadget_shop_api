import { Cart } from "../models/addToCart.schema.js";
import { Product } from "../models/product.schema.js";

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    if (!productId || typeof quantity === "string") {
      return res.status(404).json({
        message: "productId is required and quantity must be number",
      });
    }
    const product = await Product.findById(productId);
    console.log(product);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    // find user cart:
    let userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
      userCart = await Cart.create({
        user: userId,
        cartItem: [
          {
            product: productId,
            quantity,
          },
        ],
        cartPrice: product.price,
      });
      return res.status(201).json({
        data: userCart,
        message: "Successfully Added",
      });
    }

    //check existing product:
    const existingProduct = userCart.cartItem?.find(
      (item) => item.product.toString() === productId
    );

    console.log(existingProduct, "existing product");

    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      userCart.cartItem.push({
        product: productId,
        quantity,
      });
    }

    //re calculate total price:
    userCart.cartPrice = await reCalPrice(userCart.cartItem);

    await userCart.save();
    return res.status(201).json({
      data: userCart,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const reCalPrice = async (items) => {
  let price = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    price += product.price * item.quantity;
  }
  console.log(price, "priceee");
  return price;
};

//get cart items controller:

export const getCartItems = async (req, res, next) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: "cartItem",
        populate: {
          path: "product",
          model: "Product",
        },
      })
      .populate({
        path: "user",
        model: "Auth",
      });

    console.log(cart);
    if (!cart) {
      return res.status(404).json({
        message: "Item not found",
      });
    }
    return res.status(200).json({ data: cart });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// update cart item(increase / decrease)
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    if (!productId || quantity == null) {
      return res
        .status(400)
        .json({ message: "product Id and Quantity required" });
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(400).json({ message: "cart not found" });
    }
    //find item
    const item = cart.cartItem.find((i) => i._id.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: "item not found in cart" });
    }
    // if quantity 0 => delete item
    if (quantity === 0) {
      cart.cartItem = cart.cartItem.filter(
        (i) => i._id.toString() !== productId
      );
    } else item.quantity = quantity;
    //recalc price
    cart.cartPrice = await reCalPrice(cart.cartItem);
    await cart.save();

    return res.status(200).json({
      message: "cart updated",
      data: cart,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//delete item from cart
export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }

    const exists = cart.cartItem.some((i) => i._id.toString() === productId);

    if (!exists) {
      return res.status(404).json({
        message: "item not found in cart",
      });
    }

    //remove item
    cart.cartItem = cart.cartItem.filter((i) => i._id.toString() !== productId);
    cart.cartPrice = await reCalPrice(cart.cartItem);
    await cart.save();

    return res.status(200).json({
      message: "Item deleted",
      data: cart,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


//  empty cart:

// EMPTY FULL CART
export const emptyCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // find user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // empty items
    cart.cartItem = [];
    cart.cartPrice = 0; // reset price

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};