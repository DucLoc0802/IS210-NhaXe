import { Global, Module } from '@nestjs/common';
import { ProcedureService } from './procedure.service';
import { AuthProcedureController } from './controllers/auth.procedure.controller';
import { CustomerProcedureController } from './controllers/customer.procedure.controller';
import { EmployeeProcedureController } from './controllers/employee.procedure.controller';
import { VehicleProcedureController } from './controllers/vehicle.procedure.controller';
import { RouteProcedureController } from './controllers/route.procedure.controller';
import { TripProcedureController } from './controllers/trip.procedure.controller';
import { TicketProcedureController } from './controllers/ticket.procedure.controller';
import { CargoProcedureController } from './controllers/cargo.procedure.controller';
import { PromotionProcedureController } from './controllers/promotion.procedure.controller';
import { TransactionProcedureController } from './controllers/transaction.procedure.controller';
import { LoyaltyProcedureController } from './controllers/loyalty.procedure.controller';
import { ReportProcedureController } from './controllers/report.procedure.controller';
import { LookupController } from './controllers/lookup.procedure.controller';

@Global()
@Module({
  controllers: [
    AuthProcedureController,
    CustomerProcedureController,
    EmployeeProcedureController,
    VehicleProcedureController,
    RouteProcedureController,
    TripProcedureController,
    TicketProcedureController,
    CargoProcedureController,
    PromotionProcedureController,
    TransactionProcedureController,
    LoyaltyProcedureController,
    ReportProcedureController,
    LookupController,
  ],
  providers: [ProcedureService],
  exports: [ProcedureService],
})
export class ProcedureModule {}
