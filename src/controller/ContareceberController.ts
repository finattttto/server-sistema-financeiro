
import {GenericController} from './GenericController';
import {Request, Response} from 'express';
import { IController } from './IController';
import { ContaReceber } from '../entity/Contareceber';
import { AppDataSource } from '../persistence/data-source';

class ContaReceberController
    extends GenericController<ContaReceber>
    implements IController {
  public index(request: Request, response: Response) {
    return super.index(
        request,
        response,
        AppDataSource.getRepository(ContaReceber)
    );
  }
  
  public async save(request: Request, response: Response) {
    return super.save(
        request,
        response,
        AppDataSource.getRepository(ContaReceber)
    );
  }
  
  public show(request: Request, response: Response) {
    return super.show(
        request,
        response,
        AppDataSource.getRepository(ContaReceber)
    );
  }
  
  public update(request: Request, response: Response) {
    return super.update(
        request,
        response,
        AppDataSource.getRepository(ContaReceber)
    );
  }
  
  public remove(request: Request, response: Response) {
    return super.remove(
        request,
        response,
        AppDataSource.getRepository(ContaReceber)
    );
  }
  
}

export default new ContaReceberController();
