import { EntityRepository, Repository } from "typeorm";
import { ChemicalsEntity } from "./chemicals.entity";

@EntityRepository(ChemicalsEntity)
export class ChemicalsRepository extends Repository<ChemicalsEntity> {
}