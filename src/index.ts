import express from 'express';
import sectionRouter from './routers/SectionRouter';

const app = express();
const port = 3000;

app.use('/sections', sectionRouter);

app.listen(port, () => {
    console.log(`Service is running on port ${port}`)
})