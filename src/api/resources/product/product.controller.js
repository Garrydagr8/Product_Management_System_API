//changes done

const Joi = require('joi');
import Product from './product.model';

export default {
    async create(req, res) {
        try {
            const schema = Joi.object().keys({
                title: Joi.string().required(),
                price: Joi.number().required(),
                quantity: Joi.number()
                    .integer()
                    .min(0)
                    .max(5)
                    .optional(),
            });
            const { value, error } = Joi.validate(req.body, schema);
            if (error && error.details) {
                return res.status(400).json(error);
            }
            const product = await Product.create(Object.assign({}, value, { admin: req.user._id }));
            return res.json(product);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    async findAll(req, res) {
        try {
            const { page, perPage } = req.query;
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 10,
                populate: {
                    path: 'admin',
                    select: 'firstName lastName',
                },
            };
            const products = await Product.paginate({}, options);
            return res.json(products);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    async findOne(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findById(id).populate('admin', 'firstName lastName');
            if (!product) {
                return res.status(404).json({ err: 'could not find product' });
            }
            return res.json(product);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findOneAndRemove({ _id: id });
            if (!product) {
                return res.status(404).json({ err: 'could not find product' });
            }
            return res.json(product);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const schema = Joi.object().keys({
                title: Joi.string().optional(),
                price: Joi.number().optional(),
                quantity: Joi.number()
                    .integer()
                    .min(0)
                    .max(5)
                    .optional(),
            });
            const { value, error } = Joi.validate(req.body, schema);
            if (error && error.details) {
                return res.status(400).json(error);
            }
            const product = await Product.findOneAndUpdate({ _id: id }, value, { new: true });
            if (!product) {
                return res.status(404).json({ err: 'could not find product' });
            }
            return res.json(product);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
};