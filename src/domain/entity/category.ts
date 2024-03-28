import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Color } from "../enum/Color";

@Entity()
export class Category {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "enum", enum: Color })
    color: Color;

    public constructor(name: string, color: Color) {
        this.name = name;
        this.color = color;
    }
}