module.exports = function(application){
    
    application.get('/pdv', function(req, res){
        application.app.controllers.pdv.index(application, req, res);
    });

    application.get('/pdvNovo', function(req, res){
        application.app.controllers.pdv.novo(application, req, res);
    });

    application.get('/pdvEditar/:_id', function(req, res){
        application.app.controllers.pdv.editar(application, req, res);
    });

    application.get('/pdvExcluir/:_id', function(req, res){
        application.app.controllers.pdv.excluir(application, req, res);
    });

    application.post('/pdvSalvar', function(req, res){
        application.app.controllers.pdv.salvar(application, req, res);
    });
}