import { ProductModel } from '../data/Product.model.js';

class ProductManager {
    async getAll({ limit = 10, page = 1, sort, query }) {
        let filter = {};
        if (query) {
            try {
                const parsed = typeof query === 'string' ? JSON.parse(query) : query;
                filter = parsed;
            } catch (err) {
                console.warn('Query inválido. Ignorando filtro.');
            }
        }

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            lean: true
        };

        if (sort === 'asc') {
            options.sort = { price: 1 };
        } else if (sort === 'desc') {
            options.sort = { price: -1 };
        }

        return await ProductModel.paginate(filter, options);
    }

    async getById(pid) {
        return await ProductModel.findById(pid).lean();
    }

    async add(product) {
        const requiredFields = ['title', 'description', 'price', 'thumbnails', 'code', 'stock'];
        const invalidFilds = [];
        for (const field of requiredFields) {
            if (product[field] === undefined || product[field] === null) {
                invalidFilds.push(field);
            }
        }

        if (invalidFilds.length) {
            throw new Error(`Missing required fields: ${invalidFilds.join(', ')}`);
        }

        const exists = await ProductModel.exists({ code: product.code });
        if (exists) {
            throw new Error(`Product with code ${product.code} already exists`);
        }

        return await ProductModel.create(product);
    }

    async update(id, updatedData) {
        return await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}

export default ProductManager;