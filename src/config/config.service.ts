import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

@Injectable()
export class ConfigService {

  static getVariable(key: string) {
    const variable = process.env[key];
    if (!variable) {
      throw new Error(`Environment variable ${key} is undefined`);
    }
    return variable;
  }

  static getOrmConfig() {
    const {
      ORM_TYPE,
      ORM_HOST,
      ORM_USER,
      ORM_PASSWORD,
      ORM_PORT,
      ORM_DATABASE,
      ORM_ENTITIES,
      ORM_SYNCHRONIZE
    } = process.env;

    return {
      "type": ORM_TYPE || "mysql",
      "host": ORM_HOST || "localhost",
      "port": ORM_PORT || "3306",
      "username": ORM_USER || "root",
      "password": ORM_PASSWORD || "awdasd",
      "database": ORM_DATABASE || "nest",
      "entities": [ORM_ENTITIES || "dist/**/*.entity{.ts,.js}"],
      "synchronize": ORM_SYNCHRONIZE || true
    };
  }
}

