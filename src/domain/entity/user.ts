import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    weight: number

    public constructor(username: string, email: string, password: string, weight?: number) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.weight = weight;
    }
}
