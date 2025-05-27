import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager();

router.post('/', async (req, res) => {
    try {
        const { products = [] } = req.body;
        const cart = await manager.createCart(products);
        res.status(201).json(cart);
    } catch (error) {
        console.error('Error creating cart:', error);
        res.status(400).send(error.message);
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cart = await manager.getById(req.params.cid);
        cart
            ? res.status(200).json(cart)
            : res.status(404).send('Carrito no encontrado');
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send(error.message);
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const result = await manager.addProductToCart(req.params.cid, req.params.pid);
        result
            ? res.status(200).json(result)
            : res.status(404).send('Carrito o producto no encontrado');
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send(error.message);
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const cart = await manager.updateAllProducts(req.params.cid, req.body);
        if (!cart) return res.status(404).send('Carrito no encontrado');
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating cart products:', error);
        res.status(400).send(error.message);
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const quantity = req.body.quantity;
        if (typeof quantity !== 'number' || quantity < 1) {
            return res.status(400).send('Cantidad inválida');
        }

        const cart = await manager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
        if (!cart) return res.status(404).send('Carrito o producto no encontrado');
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating product quantity:', error);
        res.status(500).send(error.message);
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cart = await manager.removeProductFromCart(req.params.cid, req.params.pid);
        if (!cart) return res.status(404).send('Carrito no encontrado');
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).send(error.message);
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const cart = await manager.clearCart(req.params.cid);
        if (!cart) return res.status(404).send('Carrito no encontrado');
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).send(error.message);
    }
});

export default router;
