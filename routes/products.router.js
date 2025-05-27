import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;
        const products = await manager.getAll({ limit, page, sort, query });
        res.status(200).json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage
                ? `/api/products?page=${result.prevPage}&limit=${limit || 10}`
                : null,
            nextLink: result.hasNextPage
                ? `/api/products?page=${result.nextPage}&limit=${limit || 10}`
                : null
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send(error.message);
    }
});

router.get('/:pid', async (req, res) => {
    const product = await manager.getById(req.params.pid);
    product
        ? res.status(200).json(product)
        : res.status(404).send('Producto no encontrado');
});

router.post('/', async (req, res) => {
    try {
        const product = await manager.add(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(400).send(error.message);
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const updated = await manager.update(req.params.pid, req.body);
        updated
            ? res.status(200).json(updated)
            : res.status(404).send('Producto no encontrado');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send(error.message);
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const success = await manager.delete(req.params.pid);
        success
            ? res.sendStatus(204)
            : res.status(404).send('Producto no encontrado');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send(error.message);
    }
});

export default router;