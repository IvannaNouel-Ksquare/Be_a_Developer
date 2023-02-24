import { Request, Response } from "express";
import { Category } from "../models/categoryModel";
import { ICategory } from "../types";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const exist = await Category.findOne<ICategory>({ name });
        if (exist) {
            res.status(403).json({
                message: "Category already exists",
            });
            return;
        }

        const newCategory = new Category({
            name,
        });

        await newCategory.save();

        res.status(201).json({
            message: "Category created",
            newCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find<ICategory>();

        res.status(200).json({
            categories,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;

        const category = await Category.findById<ICategory>(categoryId);

        if (!category) {
            return res.status(404).json({
                error: "Category not found",
            });
        }

        res.status(200).json({
            category,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};
