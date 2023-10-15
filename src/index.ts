import express from 'express';
import sectionRouter from './routers/SectionRouter';
import productRouter from './routers/ProductRouter';
import shoppingListRouter from './routers/ShoppingListRouter';
import bodyParser from 'body-parser';
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
    origin: ["https://shopping-list-server-1w3v.onrender.com/shopping-lists/"], // Update with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to allow cookies or credentials
}));

app.use('/sections', sectionRouter);
app.use('/products', productRouter);
app.use('/shopping-lists', shoppingListRouter);

app.listen(port, () => {
    console.log(`Service is running on port ${port}`)
})