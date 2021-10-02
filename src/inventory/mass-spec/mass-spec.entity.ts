import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MasterEntity } from '../master/master.entity';

@Entity({ name: 'mass_spec' })
export class MassSpecEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;
    @Column({ name: 'item_id', type: 'int', nullable: true })
    item_id: number;
    @Column({ name: 'location', type: 'varchar', nullable: true })
    location: string;
    @Column({ name: 'quantity', type: 'int', nullable: true })
    quantity: number;
    @Column({ name: 'min_quantity', type: 'int', nullable: true })
    min_quantity: number;
    @Column({ name: 'max_quantity', type: 'int', nullable: true })
    max_quantity: number;
    @Column({ name: 'usage_level', type: 'varchar', nullable: true })
    usage_level: string;
    @ManyToOne(type => MasterEntity, master => master.massSpec, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'item_id' })
    master: MasterEntity
}