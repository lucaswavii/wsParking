module.exports = function(application){
    
    application.get('/permissao', function(req, res){
        application.app.controllers.permissao.index(application, req, res);
    });
    

    application.get('/permissaoEditar/:_id', function(req, res){
        application.app.controllers.permissao.editar(application, req, res);
    });    

    application.post('/permissaoSalvar', function(req, res){
        application.app.controllers.permissao.salvar(application, req, res);
    });
}