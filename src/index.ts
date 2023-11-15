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
    origin: "*", // Update with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to allow cookies or credentials
}));

app.use('/sections', sectionRouter);
app.use('/products', productRouter);
app.use('/shopping-lists', shoppingListRouter);

app.listen(port,"0.0.0.0", () => {
    console.log(`Service is running on port ${process.env.PORT || 3000}`)
})