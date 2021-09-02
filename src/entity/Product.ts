import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { MinLength, IsNotEmpty } from "class-validator";

@Entity()
@Unique(['id'])
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(3)
    @IsNotEmpty()
    name: string; // yogurt | musli (cereal) | topin (jalea)

    @Column()    
    @IsNotEmpty()
    lot: string; // Alphanumeric identifier

    @Column()
    @IsNotEmpty()
    weight: number; // Weight in grams (gr)F

    @Column()
    @MinLength(3)
    flavor: string; // remolacha, frutilla, chocolate

    @Column()
    @MinLength(3)
    @IsNotEmpty()
    supplier: string; // galactos, monkey

    @Column()
    @IsNotEmpty()
    costPrice: number; // manufacturing cost in Bs

    @Column()
    @IsNotEmpty()
    salePrice: number; //price to sale to the public

    @Column()
    stock: number; // Greather than zero - Optional
}