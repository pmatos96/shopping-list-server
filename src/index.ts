import express from 'express';
import sectionRouter from './routers/SectionRouter';
import productRouter from './routers/ProductRouter';

const app = express();
const port = 3000;

app.use('/sections', sectionRouter);
app.use('/products', productRouter);

app.listen(port, () => {
    console.log(`Service is running on port ${port}`)
})