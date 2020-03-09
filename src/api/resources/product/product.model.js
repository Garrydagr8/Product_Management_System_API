//changes done

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;
const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Product must have title'],
    },
    price: {
        type: Number,
        required: [true, 'Product must have price'],
    },
    quantity: {
        type: Number,
        default: 0,
        required: [true, 'Product must have a quantity']
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
productSchema.plugin(mongoosePaginate);
export default mongoose.model('Product', productSchema);