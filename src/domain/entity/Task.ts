import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Status } from "../enum/Status";
import { User } from "./User";

@Entity()
export class Task {
    
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Category, {nullable: true})
    @JoinColumn()
    category: Category;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    completedAt: Date;

    @Column()
    type: string;

    @Column({type: "enum", enum: Status})
    status: Status;
}