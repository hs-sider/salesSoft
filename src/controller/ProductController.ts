import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { StockHistory } from "../entity/Stock";
import { validate } from "class-validator";

export class ProductController {

    static getAll = async (req: Request, res: Response) => {
        const productRepository = getRepository(Product);
        let products;
        try {
            products = await productRepository.find();
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong' });
        }

        if (products.length > 0) {
            res.send(products);
        } else {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const productRepository = getRepository(Product);

        try {
            const product = await productRepository.findOneOrFail(id);
            res.send(product);
        } catch (e) {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static newProduct = async (req: Request, res: Response) => {
        const { id, name, lot, weight, flavor, supplier, costPrice, salePrice, stock } = req.body;
        const product = new Product();
        product.id = id;
        product.name = name;
        product.lot = lot;
        product.weight = weight;
        product.flavor = flavor;
        product.supplier = supplier;
        product.costPrice = costPrice;
        product.salePrice = salePrice;
        product.stock = stock;

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(product, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const productRepository = getRepository(Product);
        try {
            await productRepository.save(product);
        } catch (e) {
            return res.status(409).json({ message: 'Error on Product save' })
        }
        res.send('Product created');
    };

    static editProduct = async (req: Request, res: Response) => {
        let product: Product;
        const { id } = req.params;
        const { name, lot, weight, flavor, supplier, costPrice, salePrice, stock } = req.body;

        const productRepository = getRepository(Product);

        try {
            product = await productRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.stock = stock;
        product.name = name;
        product.lot = lot;
        product.weight = weight;
        product.flavor = flavor;
        product.supplier = supplier;
        product.costPrice = costPrice;
        product.salePrice = salePrice;
        product.stock = stock;

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(product, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        // Try to save product
        try {
            await productRepository.save(product);
        } catch (e) {
            return res.status(409).json({ message: 'Error on Product save' })
        }
        return res.status(201).json({ message: 'Product updated' })
    };

    static updateProductStock = async (req: Request, res: Response) => {
        let product: Product;
        const { id } = req.params;
        const { amount } = req.body;

        const productRepository = getRepository(Product);
        const stockRepository = getRepository(StockHistory);

        try {
            product = await productRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let oldStock: number = product.stock;
        let newStock: number = oldStock + amount;
        product.stock = newStock;

        const stock = new StockHistory();
        stock.idProduct = Number(id);
        stock.amount = amount;
        stock.oldStock = oldStock;
        stock.newStock = newStock;

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(product, validationOpt);
        errors.concat(await validate(stock, validationOpt));

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await productRepository.save(product);
            await stockRepository.save(stock);
        } catch (e) {
            return res.status(409).json({ message: 'Error on Product save' })
        }
        return res.status(201).json({ message: 'Product updated' })
    };

    static deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const productRepository = getRepository(Product);
        let product: Product;

        try {
            product = await productRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: 'Product not found' })
        }

        // Remove product
        productRepository.delete(id);
        res.status(201).json({ message: 'Product deleted' })
    };
}