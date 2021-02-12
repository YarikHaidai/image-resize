import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from "bcrypt";
import { ImageEntity } from "../image/image.entity";
import { ConfigService } from "../config/config.service";

@Entity("user")
export class UserEntity {
  constructor(private configService: ConfigService) {}

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => ImageEntity, imageEntity => imageEntity.user)
  images: ImageEntity[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, this.configService.getVariable('SALT_LENGTH'));
    }
  }
}