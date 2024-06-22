import { Between, FindOptionsWhere, TypeORMError } from "typeorm";
import { AppDataSource } from "../persistence/data-source";
import { Request, Response } from "express";
import { trataFields } from "../utils/trata-fields";
import { trataParams } from "../utils/trata-params";
import { Usuario } from "../entity/Usuario";

class UsuarioControler {
  public async index(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(Usuario);
    try {
      const query = request.query || {};
      const searchParam: any[] = JSON.parse((query.params as string) || "[]");
      if (query.fields) {
        query.fields = query.fields.toString();
        query.fields = query.fields.replace(/\[/g, "");
        query.fields = query.fields.replace(/\]/g, "");
        query.fields = query.fields.replace(/\"/g, "");
      }
      let fields: any = await trataFields(
        (query.fields as string) || undefined
      );
      let relations: any = JSON.parse((query.relations as string) || "{}");
      let order: any = JSON.parse((query.order as string) || '{"id":"DESC"}');
      let usaQueryBuilder = query.qb ? true : false;
      const skip = Number(query.skip) || 0;
      const take = Number(query.take) || 10;

      let where: any[] = trataParams(searchParam);

      if ((request.query.count as string) == "true") {
        try {
          const count = await repository.count({
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
          let fieldOrder = "id";
          if (order) {
            for (const f in order) {
              fieldOrder = f;
            }
          }
          let objs = [];
          if (usaQueryBuilder) {
            objs = await repository
              .createQueryBuilder()
              .select(fields)
              .where(where || [])
              .orderBy(fieldOrder, order[fieldOrder] || "DESC")
              .limit(take)
              .offset(skip)
              .loadAllRelationIds()
              .getMany();
          } else {
            let atrib = 0;
            if (relations) {
              for (const f in relations) {
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
          }

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

  public async save(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(Usuario);
    if (request.body.id && request.body.id <= 0) {
      request.body.id = null;
    }
    try {
      const obj = await repository.save(request.body);
      request.headers["id-object"] = obj.id;
      return response.status(201).json(obj);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }

  public async show(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(Usuario);
    const { id } = request.params;

    if (!id) {
      return response
        .status(400)
        .json({ message: "Parâmetro ID não informado" });
    }
    try {
      const found = await repository.findOne({
        where: { id: id as any },
        loadEagerRelations: true,
        loadRelationIds: {
          disableMixedMap: true,
        },
      });
      if (!found) {
        return response.status(404).json({ message: "Recurso não encontrado" });
      }
      return response.json(found);
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }

  public async update(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(Usuario);
    const { id } = request.params;
    if (!id) {
      return response
        .status(400)
        .json({ message: "Parâmetro ID não informado" });
    }
    try {
      const found = await repository.exists({
        where: {
          id: Number(id),
        } as FindOptionsWhere<Usuario>,
      });
      if (!found) {
        return response.status(404).json({ message: "Recurso não encontrado" });
      }
      try {
        await repository.update(Number(id) || "", request.body);
        const novo = request.body;
        novo.id = Number(id);
        return response.json(novo);
      } catch (error: any) {
        return response.status(500).json({ message: error.message });
      }
    } catch (error: any) {
      return response.status(500).json({ message: error.message });
    }
  }

  public async remove(request: Request, response: Response) {
    const repository = AppDataSource.getRepository(Usuario);
    try {
      const { id } = request.params;
      const { definitivo } = request.query;

      if (!id) {
        return response
          .status(400)
          .json({ message: "Parâmetro ID não informado" });
      }

      const found = await repository.exist({
        where: {
          id: Number(id),
        } as FindOptionsWhere<Usuario>,
      });

      if (!found) {
        return response.status(404).json({ message: "Recurso não encontrado" });
      }

      if (definitivo) {
        const obj = { id: Number(id) };
        await repository.remove([obj as Usuario]);
      } else {
        await repository.update(id, { deleted: true } as any);
      }

      return response.status(204).json();
    } catch (e) {
      const error = e as TypeORMError;
      return response.status(500).json({ message: error.message });
    }
  }
}

export default new UsuarioControler();
