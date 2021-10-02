import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '@Root2021',
    database: 'inventory_db',
    autoLoadEntities: true,
    synchronize: true,
}