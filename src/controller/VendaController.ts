
import {GenericController} from './GenericController';
import {Request, Response} from 'express';
import { IController } from './IController';
import { Venda } from '../entity/Venda';
import { AppDataSource } from '../persistence/data-source';

class VendaController
    extends GenericController<Venda>
    implements IController {
  public index(request: Request, response: Response) {
    return super.index(
        request,
        response,
        AppDataSource.getRepository(Venda)
    );
  }
  
  public async save(request: Request, response: Response) {
    return super.save(
        request,
        response,
        AppDataSource.getRepository(Venda)
    );
  }
  
  public show(request: Request, response: Response) {
    return super.show(
        request,
        response,
        AppDataSource.getRepository(Venda)
    );
  }
  
  public update(request: Request, response: Response) {
    return super.update(
        request,
        response,
        AppDataSource.getRepository(Venda)
    );
  }
  
  public remove(request: Request, response: Response) {
    return super.remove(
        request,
        response,
        AppDataSource.getRepository(Venda)
    );
  }
  
}

export default new VendaController();
