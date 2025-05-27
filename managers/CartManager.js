import { CartModel } from '../data/Cart.model.js';

class CartManager {
    async getById(id) {
        const cart = await CartModel.findById(id).populate('products.product');
        return cart || null;
    }
    
    async createCart(products = []) {

        const cleanedProducts = products.map(p => ({
            product: p.productId,
            quantity: p.quantity || 1
        }));

        return await CartModel.create({ products: cleanedProducts });
    }

    async addProductToCart(cartId, productId) {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            return null;
        }

        const existing = cart.products.find(p => p.product.equals(productId));
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        return await cart.populate('products.product');
    }

    async updateAllProducts(id, newProducts) {
        const cart = await CartModel.findById(id);
        if (!cart) {
            return null;
        }

        cart.products = newProducts.map(p => ({
            product: p.productId,
            quantity: p.quantity || 1
        }));

        await cart.save();
        return await cart.populate('products.product');
    }

    async updateProductQuantity(cid, pid, quantity) {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return null;
        }

        const item = cart.products.find(p => p.product.equals(pid));
        if (!item) {
            return null;
        }

        item.quantity = quantity;
        await cart.save();
        return await cart.populate('products.product');
    }

    async removeProductFromCart(cid, pid) {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return null;
        }

        cart.products = cart.products.filter(p => !p.product.equals(pid));
        await cart.save();
        return await cart.populate('products.product');
    }

    async clearCart(cid) {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return null;
        }

        cart.products = [];
        await cart.save();
        return await cart.populate('products.product');
    }
}

export default CartManager;