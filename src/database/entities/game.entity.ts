import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'games' })
class Game {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column({ type: 'timestamptz' })
    createdAt!: string;
}

export default Game;
