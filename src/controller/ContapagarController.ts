
import {GenericController} from './GenericController';
import {Request, Response} from 'express';
import { IController } from './IController';
import { ContaPagar } from '../entity/Contapagar';
import { AppDataSource } from '../persistence/data-source';

class ContaPagarController
    extends GenericController<ContaPagar>
    implements IController {
  public index(request: Request, response: Response) {
    return super.index(
        request,
        response,
        AppDataSource.getRepository(ContaPagar)
    );
  }
  
  public async save(request: Request, response: Response) {
    return super.save(
        request,
        response,
        AppDataSource.getRepository(ContaPagar)
    );
  }
  
  public show(request: Request, response: Response) {
    return super.show(
        request,
        response,
        AppDataSource.getRepository(ContaPagar)
    );
  }
  
  public update(request: Request, response: Response) {
    return super.update(
        request,
        response,
        AppDataSource.getRepository(ContaPagar)
    );
  }
  
  public remove(request: Request, response: Response) {
    return super.remove(
        request,
        response,
        AppDataSource.getRepository(ContaPagar)
    );
  }
  
}

export default new ContaPagarController();
