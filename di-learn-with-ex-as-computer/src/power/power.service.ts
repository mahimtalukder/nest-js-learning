import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
    supplyPower(watts: number): void {
        console.log(`Supplying ${watts} watts of power.`);
    }
}
