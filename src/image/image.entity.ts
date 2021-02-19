import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { UserEntity } from "../user/user.entity";

@Entity("image")
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  path: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @ManyToOne(() => UserEntity, userEntity => userEntity.images)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;

  @Column()
  user_id: number;
}
