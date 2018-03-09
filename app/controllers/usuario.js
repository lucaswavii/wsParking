module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    
    usuarioDao.listar(function(error, usuarios){
        connection.end();
        if( error ) {
            res.render('usuarioListar', { validacao : [ {'msg': error.sqlMessage }], usuarios : {}, sessao: req.session.usuario });
            return;
        }
        res.render('usuarioListar', { validacao : {}, usuarios : usuarios, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();

    var empresaDao = new application.app.models.EmpresaDAO(connection);    
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    empresaDao.listar(function(error, empresas ){
        
        funcionarioDao.listar(function(error, funcionarios ){
            
            grupoDao.listar(function(error, grupos ){
                connection.end();
                if( error ) {
                    res.render('usuarioEditar', { validacao : [ {'msg': error.sqlMessage }], usuarios : {}, grupos: {}, funcionarios: {}, empresas: {}, sessao: req.session.usuario });
                    return;
                }
            
                res.render('usuarioEditar', { validacao : {}, usuarios : {}, grupos:grupos,  funcionarios: funcionarios, empresas, empresas, sessao: req.session.usuario });
               
            });
        });
    });
}

module.exports.editar = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);    
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var grupoDao = new application.app.models.GrupoDAO(connection);    
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    
    empresaDao.listar(function(error, empresas ){
        
        funcionarioDao.listar(function(error, funcionarios ){
            
            grupoDao.listar(function(error, grupos ){
                
                usuarioDao.editar( req.params._id, function(error, usuarios){
                    connection.end();
                    if( error ) {
                        res.render('usuarioEditar', { validacao : [ {'msg': error.sqlMessage }], usuarios : {}, grupos: {}, funcionarios: {}, empresas: {}, sessao: req.session.usuario });
                        return;
                    }

                    res.render('usuarioEditar', { validacao : {}, usuarios : usuarios, grupos:grupos,  funcionarios: funcionarios, empresas, empresas, sessao: req.session.usuario });
                });
            });
        });
    });
}

module.exports.excluir = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    
    var connection = application.config.dbConnection();
    var UsuarioDAO = new application.app.models.UsuarioDAO(connection);
    
    usuarioDao.excluir( req.params._id, function(error, usuarios){
        connection.end();
        if( error ) {
            res.render('usuario', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], usuarios : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/usuario");
    });
}

module.exports.salvar = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var dadosForms = req.body;
    req.assert('nome', 'Nome é obrigatório').notEmpty();
    
    var erros = req.validationErrors();

    if(erros){
      
        res.render('usuarioEditar', {validacao: erros,  usuarios: [ dadosForms], sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var usuarioDao = new application.app.models.UsuarioDAO(connection);        
    
    usuarioDao.salvar(dadosForms, function(error, result){
        connection.end();   
        if( error ) {
            res.render('usuarioEditar', { validacao : [ {'msg': error.sqlMessage }], usuarios : [ dadosForms], sessao: req.session.usuario });
            return;
        }
        res.redirect('/usuario');
    });
     
}