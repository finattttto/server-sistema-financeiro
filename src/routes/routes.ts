import { Router } from "express";
import ClienteController from "../controller/ClienteController";
import ContapagarController from "../controller/ContapagarController";
import ContareceberController from "../controller/ContareceberController";
import ProdutoController from "../controller/ProdutoController";
import UsuarioController from "../controller/UsuarioController";
import VendaController from "../controller/VendaController";

const routes = Router();

routes.route('/clientes')
		.get(ClienteController.index)
		.post(ClienteController.save);

routes.route('/clientes/:id')
		.get(ClienteController.show)
		.put(ClienteController.update)
		.delete(ClienteController.remove);

routes.route('/contapagar')
		.get(ContapagarController.index)
		.post(ContapagarController.save);

routes.route('/contapagar/:id')
		.get(ContapagarController.show)
		.put(ContapagarController.update)
		.delete(ContapagarController.remove);

routes.route('/contareceber')
        .get(ContareceberController.index)
        .post(ContareceberController.save);

routes.route('/contareceber/:id')
        .get(ContareceberController.show)
        .put(ContareceberController.update)
        .delete(ContareceberController.remove);

routes.route('/produtos')
        .get(ProdutoController.index)
        .post(ProdutoController.save);

routes.route('/produtos/:id')
        .get(ProdutoController.show)
        .put(ProdutoController.update)
        .delete(ProdutoController.remove);

routes.route('/usuarios')
        .get(UsuarioController.index)
        .post(UsuarioController.save);

routes.route('/usuarios/:id')
        .get(UsuarioController.show)
        .put(UsuarioController.update)
        .delete(UsuarioController.remove);

routes.route('/venda')
        .get(VendaController.index)
        .post(VendaController.save);

routes.route('/venda/:id')
        .get(VendaController.show)
        .put(VendaController.update)
        .delete(VendaController.remove);
        
export default routes;