module.exports = function(application){
    application.get('/install', function(req, res){
        application.app.controllers.install.index(application, req, res);
    });
    
    application.get('/bancoInstall', function(req, res){
        application.app.controllers.install.bancoInstall(application, req, res);
    });
}