import { Request, Response } from "express";
import { Between, FindOptionsWhere, Repository, TypeORMError } from "typeorm";
import { trataFields } from "../utils/trata-fields";
import { GenericEntity } from "../entity/GenericEntity";
import { trataParams } from "../utils/trata-params";
import { Usuario } from "../entity/Usuario";
import { AppDataSource } from "../persistence/data-source";

export abstract class GenericController<T extends GenericEntity> {
  public async index(
    request: Request,
    response: Response,
    repository: Repository<T>
  ): Promise<any> {
    try {
      const query = request.query || {};
      const searchParam: any[] = JSON.parse((query.params as string) || "[]");
      if (query.fields) {
        query.fields = query.fields.toString();
        query.fields = query.fields.replace(/\[/g, "");
        query.fields = query.fields.replace(/]/g, "");
        query.fields = query.fields.replace(/"/g, "");
      }
      let fields: any = await trataFields(
        (query.fields as string) || undefined
      );
      let relations: any = JSON.parse((query.relations as string) || "{}");
      let order: any = JSON.parse((query.order as string) || '{"id":"DESC"}');
      const skip: number = Number(query.skip) || 0;
      const take: number = Number(query.take) || 10;

      let where: any[] = trataParams(searchParam);

      if ((request.query.count as string) == "true") {
        try {
          const count: number = await repository.count({
            where: where.length ? where : undefined,
            skip: skip,
            take: take,
          });
          return response.json(count);
        } catch (error: any) {
          return response.status(500).json({ message: error.message });
        }
      } else {
        try {
          let fieldOrder: string = "id";
          if (order) {
            for (const f in order) {
              fieldOrder = f;
            }
          }
          let objs: any[];
          let atrib: number = 0;
          if (relations) {
            for (const _f in relations) {
              atrib++;
            }
          }
          objs = await repository.find({
            select: fields ? fields : undefined,
            order: order as any,
            relations: relations ? relations : undefined,
            where: where.length ? where : undefined,
            skip: skip,
            take: take,
            loadEagerRelations: !atrib,
            loadRelationIds: atrib
              ? undefined
              : {
                  disableMixedMap: true,
                },
          });

          return response.json(objs);
        } catch (error: any) {
          console.error(error);
          return response.status(500).json({ message: error.message });
        }
      }
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }

  public async save(
    request: Request,
    response: Response,
    repository: Repository<T>,
    syncFunction?: string[]
  ): Promise<any> {
    try {
      const exist: boolean = await repository.existsBy({
        id: request.body?.id,
      });
      if (exist && request.body.id) {
        await repository.update(request.body?.id, request.body);
        return response.status(200).json(request.body);
      } else {
        const obj = await repository.save(request.body);
        request.headers["id-object"] = obj.id;
        return response.status(201).json(obj);
      }
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }

  public async show(
    request: Request,
    response: Response,
    repository: Repository<T>
  ): Promise<any> {
    try {
      const { id } = request.params;
      if (!id) {
        return response
          .status(400)
          .json({ message: "Parâmetro ID não informado" });
      }
      const found: T | null = await repository.findOne({
        where: { id: id as any },
      });
      if (!found) {
        return response.status(404).json({ message: "Recurso não encontrado" });
      }
      return response.status(200).json(found);
    } catch (e: any) {
      return response.status(500).json({ message: e.message });
    }
  }

  public async update(
    request: Request,
    response: Response,
    repository: Repository<T>
  ): Promise<any> {
    try {
      const { id } = request.params;
      if (!id) {
        return response
          .status(400)
          .json({ message: "Parâmetro ID não informado" });
      }
      const found: boolean = await repository.exists({
        where: {
          id: Number(id),
        } as FindOptionsWhere<T>,
      });
      if (!found) {
        return response.status(404).json({ message: "Recurso não encontrado" });
      }
      const updated = await repository.update(Number(id) || "", request.body);
      return response.json(updated);
    } catch (e: any) {
      return response.status(500).json({ message: e.message });
    }
  }

  public async remove(
    request: Request,
    response: Response,
    repository: Repository<T>
  ): Promise<any> {
    try {
      const { id } = request.params;
      const { definitivo } = request.query;
      if (!id) {
        return response
          .status(400)
          .json({ message: "Parâmetro ID não informado" });
      }
      const found: boolean = await repository.exists({
        where: {
          id: Number(id),
        } as FindOptionsWhere<T>,
      });
      if (!found) {
        return response.status(404).json({ message: "Recurso não encontrado" });
      }

      const obj = { id: Number(id) };
      await repository.remove([obj as T]);

      return response.status(204).json();
    } catch (e) {
      const error = e as TypeORMError;
      return response.status(500).json({ message: error.message });
    }
  }
}
