
import {GenericController} from './GenericController';
import {Request, Response} from 'express';
import { IController } from './IController';
import { Cliente } from '../entity/Cliente';
import { AppDataSource } from '../persistence/data-source';

class ClienteController
    extends GenericController<Cliente>
    implements IController {
  public index(request: Request, response: Response) {
    return super.index(
        request,
        response,
        AppDataSource.getRepository(Cliente)
    );
  }
  
  public async save(request: Request, response: Response) {
    return super.save(
        request,
        response,
        AppDataSource.getRepository(Cliente)
    );
  }
  
  public show(request: Request, response: Response) {
    return super.show(
        request,
        response,
        AppDataSource.getRepository(Cliente)
    );
  }
  
  public update(request: Request, response: Response) {
    return super.update(
        request,
        response,
        AppDataSource.getRepository(Cliente)
    );
  }
  
  public remove(request: Request, response: Response) {
    return super.remove(
        request,
        response,
        AppDataSource.getRepository(Cliente)
    );
  }
  
}

export default new ClienteController();
