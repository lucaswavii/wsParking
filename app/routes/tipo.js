module.exports = function(application){
    
    application.get('/tipos', function(req, res){
        application.app.controllers.tipo.index(application, req, res);
    });

    application.get('/tiposNovo', function(req, res){
        application.app.controllers.tipo.novo(application, req, res);
    });

    application.get('/tiposEditar/:_id', function(req, res){
        application.app.controllers.tipo.editar(application, req, res);
    });

    application.get('/tiposExcluir/:_id', function(req, res){
        application.app.controllers.tipo.excluir(application, req, res);
    });

    application.post('/tiposSalvar', function(req, res){
        application.app.controllers.tipo.salvar(application, req, res);
    });
}