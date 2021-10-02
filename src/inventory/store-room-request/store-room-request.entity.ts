import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MasterEntity } from '../master/master.entity';

@Entity({ name: 'store_room_request' })
export class StoreRoomRequestEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;
    @Column({ name: 'item_id', type: 'int', nullable: true })
    item_id: number;
    @Column({ name: 'quantity', type: 'int', nullable: true })
    quantity: number;
    @Column({ name: 'department', type: 'varchar', nullable: true })
    department: string;
    @Column({ name: 'status', type: 'varchar', nullable: true })
    status: string;
    @Column({ name: 'location', type: 'varchar', nullable: true })
    location: string;
    @Column({ name: 'time_requested', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true})
    time_requested: Date;
    @Column({ name: 'time_updated', type: 'datetime', nullable: true })
    time_updated: Date;
    @Column({ name: 'is_confirmed', type: 'boolean', nullable: true })
    is_confirmed: boolean;
    @Column({ name: 'user', type: 'varchar', nullable: true })
    user: string;
    @Column({ name: 'comment', type: 'varchar', nullable: true })
    comment: string;
    @ManyToOne(type => MasterEntity, master => master.storeRoomRequest, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'item_id' })
    master: MasterEntity
}