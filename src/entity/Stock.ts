import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MinLength, IsNotEmpty } from "class-validator";

@Entity()
@Unique(['id'])
export class StockHistory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    idProduct: number;

    @Column()
    @IsNotEmpty()
    amount: number; // 10 or +10 for increase AND -10 for decrease

    @Column()
    @IsNotEmpty()
    oldStock: number; // 10 or +10 for increase AND -10 for decrease

    @Column()
    @IsNotEmpty()
    newStock: number; // 10 or +10 for increase AND -10 for decrease

    @Column()
    @CreateDateColumn()
    createdAt: Date;
}