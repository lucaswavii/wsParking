module.exports = function(application){
    
    application.get('/banco', function(req, res){
        application.app.controllers.banco.index(application, req, res);
    });

    application.get('/bancoNovo', function(req, res){
        application.app.controllers.banco.novo(application, req, res);
    });

    application.get('/bancoEditar/:_id', function(req, res){
        application.app.controllers.banco.editar(application, req, res);
    });

    application.get('/bancoExcluir/:_id', function(req, res){
        application.app.controllers.banco.excluir(application, req, res);
    });

    application.post('/bancoSalvar', function(req, res){
        application.app.controllers.banco.salvar(application, req, res);
    });
}