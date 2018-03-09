module.exports = function(application){
    
    application.get('/tipoFuncionario', function(req, res){
        application.app.controllers.tipoFuncionario.index(application, req, res);
    });

    application.get('/tipoFuncionarioNovo', function(req, res){
        application.app.controllers.tipoFuncionario.novo(application, req, res);
    });

    application.get('/tipoFuncionarioEditar/:_id', function(req, res){
        application.app.controllers.tipoFuncionario.editar(application, req, res);
    });

    application.get('/tipoFuncionarioExcluir/:_id', function(req, res){
        application.app.controllers.tipoFuncionario.excluir(application, req, res);
    });

    application.post('/tipoFuncionarioSalvar', function(req, res){
        application.app.controllers.tipoFuncionario.salvar(application, req, res);
    });
}