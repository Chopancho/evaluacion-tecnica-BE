import { BeforeInsert, Column } from 'typeorm';

export class BaseEntity {
  @Column('date')
  created_at: string;

  @BeforeInsert()
  addDate() {
    if (!this.created_at) {
      this.created_at = new Date().toISOString().split('T')[0];
    }
  }
}
