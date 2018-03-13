module.exports = function(application){
    
    application.get('/cores', function(req, res){
        application.app.controllers.cor.index(application, req, res);
    });

    application.get('/coresNovo', function(req, res){
        application.app.controllers.cor.novo(application, req, res);
    });

    application.get('/coresEditar/:_id', function(req, res){
        application.app.controllers.cor.editar(application, req, res);
    });

    application.get('/coresExcluir/:_id', function(req, res){
        application.app.controllers.cor.excluir(application, req, res);
    });

    application.post('/coresSalvar', function(req, res){
        application.app.controllers.cor.salvar(application, req, res);
    });
}