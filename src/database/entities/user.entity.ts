import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ type: 'timestamptz' })
    createdAt!: string;
}

export default User;
