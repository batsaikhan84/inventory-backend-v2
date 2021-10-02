import { EntityRepository, Repository } from "typeorm";
import { AnalyticsEntity } from "./analytics.entity";
import { AnalyticsDto } from "./analytics-dto";

@EntityRepository(AnalyticsEntity)
export class AnalyticsRepository extends Repository<AnalyticsEntity> {
  async createAnalytics(analyticsDto: AnalyticsDto): Promise<AnalyticsEntity> {
    const {
      old_quantity, new_quantity, item_id, department, user, issued, received, issued_cost, received_cost, number_received, number_issued
    } = analyticsDto
    const auditItem = new AnalyticsEntity()
    auditItem.item_id = item_id,
      auditItem.issued = issued,
      auditItem.received = received,
      auditItem.received_cost = received_cost,
      auditItem.issued_cost = issued_cost,
      auditItem.new_quantity = new_quantity,
      auditItem.old_quantity = old_quantity,
      auditItem.number_issued = number_issued,
      auditItem.number_received = number_received,
      auditItem.time_created = new Date(),
      auditItem.user = user,
      auditItem.department = department,
      await auditItem.save()
    return auditItem
  }
}