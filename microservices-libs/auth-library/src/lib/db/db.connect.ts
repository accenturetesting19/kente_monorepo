import { Sequelize } from "sequelize-typescript";
import { Entities } from "../entity/entities";
import { ConfigService } from "@nestjs/config";
export const DbConnector = [
  {
    provide: "SEQUELIZE",
    import: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: "postgres",
        host: process.env["HOST"],
        port: parseInt(<string>process.env["PORT"]),
        username: process.env["NAME"],
        password: process.env["PASSWORD"],
        database: process.env["DATABASE"],
        standardConformingStrings: false,
        dialectOptions: {
          clientMinMessages: "ignore",
        },
        define: {
          freezeTableName: true,
          createdAt: false,
          updatedAt: false,
        },
      });
      sequelize.addModels(Entities);
      return sequelize;
    },
  },
];
