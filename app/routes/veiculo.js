module.exports = function(application){
    
    application.get('/veiculos', function(req, res){
        application.app.controllers.veiculo.index(application, req, res);
    });

    application.get('/veiculosNovo', function(req, res){
        application.app.controllers.veiculo.novo(application, req, res);
    });

    application.get('/veiculoEditar/:_id', function(req, res){
        application.app.controllers.veiculo.editar(application, req, res);
    });

    application.get('/veiculoExcluir/:_id', function(req, res){
        application.app.controllers.veiculo.excluir(application, req, res);
    });

    application.post('/veiculosSalvar', function(req, res){
        application.app.controllers.veiculo.salvar(application, req, res);
    });
}