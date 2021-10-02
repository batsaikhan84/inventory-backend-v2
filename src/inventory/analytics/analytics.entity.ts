import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MasterEntity } from "../master/master.entity";

@Entity({name: 'analytics'})
export class AnalyticsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: 'old_quantity', type: 'int', nullable: true})
    old_quantity: number;
    @Column({ name: 'new_quantity', type: 'int', nullable: true})
    new_quantity: number;
    @Column({ name: 'time_created', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true})
    time_created: Date;
    @Column({ name: 'item_id', type: 'int', nullable: true})
    item_id: number;
    @Column({ name: 'user', type: 'varchar', nullable: true})
    user: string;
    @Column({ name: 'department', type: 'varchar', nullable: true})
    department: string;
    @Column({name: 'issued', type: 'boolean', nullable: true})
    issued: boolean;
    @Column({name: 'received', type: 'boolean', nullable: true})
    received: boolean;
    @Column({name: 'issued_cost', type: 'double', nullable: true})
    issued_cost: number;
    @Column({name: 'received_cost', type: 'double', nullable: true})
    received_cost: number;
    @Column({name: 'number_issued', type: 'int', nullable: true})
    number_issued: number;
    @Column({name: 'number_received', type: 'int', nullable: true})
    number_received: number;
    @ManyToOne(type => MasterEntity, master => master.analytics, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'item_id' })
    master: MasterEntity
}