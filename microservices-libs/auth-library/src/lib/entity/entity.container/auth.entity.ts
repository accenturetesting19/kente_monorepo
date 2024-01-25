import { DataTypes } from "sequelize";
import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
  tableName: "authentication",
  schema: 'auth'

})
export class authEntity extends Model<authEntity> {
  @PrimaryKey
  @Column({
    type: DataTypes.STRING,
  })
  public MTN_ID!: string;
  @Column({
    type: DataTypes.STRING,
  })
  public Name!: string;
}
