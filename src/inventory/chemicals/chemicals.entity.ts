import { MasterEntity } from "../master/master.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'chemicals' })
export class ChemicalsEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;
    @Column({ name: 'cas', type: 'varchar', nullable: true })
    cas: string;
    @Column({ name: 'physical_state', type: 'varchar', nullable: true })
    physical_state: string;
    @Column({ name: 'container_size', type: 'varchar', nullable: true })
    container_size: string;
    @Column({ name: 'health_hr', type: 'int', nullable: true })
    health_hr: number;
    @Column({ name: 'fire_hr', type: 'int', nullable: true })
    fire_hr: number;
    @Column({ name: 'special_hr', type: 'int', nullable: true })
    special_hr: number;
    @Column({ name: 'special_notes', type: 'varchar', nullable: true })
    special_notes: string;
    @Column({ name: 'item_id', type: 'int', nullable: true })
    item_id: number;
    @ManyToOne(type => MasterEntity, master => master.chemicals, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'item_id' })
    master: MasterEntity
}