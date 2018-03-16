module.exports = function(application){
    
    application.get('/mensalista', function(req, res){
        application.app.controllers.mensalista.index(application, req, res);
    });

    application.get('/mensalistaNovo', function(req, res){
        application.app.controllers.mensalista.novo(application, req, res);
    });

    application.get('/mensalistaEditar/:_id', function(req, res){
        application.app.controllers.mensalista.editar(application, req, res);
    });

    application.get('/mensalistaExcluir/:_id', function(req, res){
        application.app.controllers.mensalista.excluir(application, req, res);
    });

    application.post('/mensalistaSalvar', function(req, res){
        application.app.controllers.mensalista.salvar(application, req, res);
    });
}