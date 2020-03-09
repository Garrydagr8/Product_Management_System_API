//changes done

import inventoryService from './inventory.service';
import Inventory from './inventory.model';

export default {
    async create(req, res) {
        try {
            const { value, error } = inventoryService.validateBody(req.body);
            if (error && error.details) {
                return res.json(error);
            }
            const inventory = await Inventory.create(Object.assign({}, value, { user: req.user._id }));
            return res.json(inventory);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    async findAll(req, res) {
        try {
            const inventories = await Inventory.find()
                .populate('products')
                .populate('user', 'firstName lastName');
            return res.json(inventories);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
};