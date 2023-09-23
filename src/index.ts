import express from 'express';
import sectionRouter from './routers/SectionRouter';
import productRouter from './routers/ProductRouter';
import shoppingListRouter from './routers/ShoppingListRouter';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/sections', sectionRouter);
app.use('/products', productRouter);
app.use('/shopping-list', shoppingListRouter);

app.listen(port, () => {
    console.log(`Service is running on port ${port}`)
})