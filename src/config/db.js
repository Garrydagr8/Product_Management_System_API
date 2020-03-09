//changes done

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
export const connect = () => mongoose.connect('mongodb://localhost/product_api');