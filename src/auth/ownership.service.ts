import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class OwnershipService {
   async checkUserOwnership(request: Request, repository?: Repository<any>) {
    const entity = await repository.findOne({ where: { id: request.params.id } });
    
    if (!entity || entity.user_id != request.user["id"]) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
