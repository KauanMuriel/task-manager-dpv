import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Status } from "../enum/status";
import { User } from "./user";

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

    public constructor(title: string, description: string, type: string, status: Status, category?: Category, user?: User) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.status = status;
        this.category = category;
        this.user = user;
    }
}