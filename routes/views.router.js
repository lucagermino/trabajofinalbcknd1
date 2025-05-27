import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import CartManager from '../managers/CartManager.js';

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.use(async (req, res, next) => {
    if (!req.session.cartId) {
        const cart = await cartManager.createCart();
        req.session.cartId = cart._id.toString();
        console.log('🛒 Carrito creado:', req.session.cartId);
    }

    next();
});

router.get('/products', async (req, res) => {
    const { limit, page, sort, query } = req.query;
    const result = await productManager.getAll({ limit, page, sort, query });

    console.log('🪪 Enviando cartId a vista:', req.session.cartId);
    
    res.render('products/index', {
        products: result.docs,
        pagination: {
            hasPrev: result.hasPrevPage,
            hasNext: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            currentPage: result.page
        },
        cartId: req.session.cartId
    });
});

router.get('/products/create', (req, res) => {
    res.render('products/create');
});

router.get('/products/:pid', async (req, res) => {
    const product = await productManager.getById(req.params.pid);
    if (!product) return res.status(404).render('404', { message: 'Producto no encontrado' });

    res.render('products/detail', { product });
});

router.get('/carts/:cid', async (req, res) => {
    const cart = await cartManager.getById(req.params.cid);
    if (!cart) return res.status(404).render('404', { message: 'Carrito no encontrado' });

    res.render('carts/detail', { cart });
});

router.post('/products', async (req, res) => {
    try {
        const product = {
            ...req.body,
            price: parseFloat(req.body.price),
            stock: parseInt(req.body.stock),
            thumbnails: req.body.thumbnails
                ? req.body.thumbnails.split(',').map(url => url.trim())
                : []
        };

        const result = await productManager.add(product);
        res.redirect('/products');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;
