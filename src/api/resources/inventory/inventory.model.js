//changes done
const mongoose = require('mongoose');

const { Schema } = mongoose;
const inventorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Inventory List must have name'],
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }, ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
export default mongoose.model('Inventory', inventorySchema);