import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm"

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({
        type:'timestamp',
        name:'created_At'
    })
    createdAt: Date

    @CreateDateColumn({
        type:'timestamp',
        name:'updated_At'
    })
    updatedAt: Date
}