module.exports.index = function(application, req, res){
	var connection = application.config.dbConnection();
    var installDao = new application.app.models.InstallDAO(connection);
    res.render('install', { validacoes: {}});
	

}

module.exports.bancoInstall = function(application, req, res){
    res.render('bancoInstall', { validacoes: {}});
	
}
