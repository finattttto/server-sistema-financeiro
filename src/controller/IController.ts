import { Request, Response } from "express";


export interface IController {
    index(request: Request, response: Response): Promise<any>;
  
    save(request: Request, response: Response): Promise<any>;
  
    show(request: Request, response: Response): Promise<any>;
  
    update(request: Request, response: Response): Promise<any>;
  
    remove(request: Request, response: Response): Promise<any>;
}