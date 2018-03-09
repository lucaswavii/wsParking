module.exports.index = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    } 
       
    var connection = application.config.dbConnection();
    var clienteDao = new application.app.models.ClienteDAO(connection);
    
    clienteDao.listar(function(error, clientes){
        connection.end();
        
        if( error ) {
            res.render('clienteListar', { validacao : [ {'msg': error.sqlMessage }], clientes : {}, sessao: req.session.usuario });
            return;
        }
        res.render('clienteListar', { validacao : {}, clientes : clientes, sessao: req.session.usuario });
    });
}

module.exports.novo = function( application, req, res ){    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    } 
    var connection = application.config.dbConnection();

    var funcionariosDao = new application.app.models.FuncionarioDAO(connection);
    funcionariosDao.listar(function(error, funcionarios){
        res.render('clienteEditar', { validacao : {}, clientes : {}, funcionarios: funcionarios, sessao: req.session.usuario });
    });
}

module.exports.editar = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var clienteDao = new application.app.models.ClienteDAO(connection);
    var funcionariosDao = new application.app.models.FuncionarioDAO(connection);
 
    funcionariosDao.listar(function(error, funcionarios){
        clienteDao.editar( req.params._id, function(error, clientes){
            connection.end();
            if( error ) {
                res.render('clienteEditar', { validacao : [ {'msg': error.sqlMessage }], clientes : {}, funcionarios: funcionarios, sessao: req.session.usuario });
                return;
            }
            res.render('clienteEditar', { validacao : {}, clientes : clientes, funcionarios: funcionarios, sessao: req.session.usuario });
    
        });
    });
}

module.exports.excluir = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var clienteDao = new application.app.models.ClienteDAO(connection);
    
    clienteDao.excluir( req.params._id, function(error, clientes){
        connection.end();
        if( error ) {
            res.render('cliente', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], clientes : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/cliente");
    });
}

module.exports.salvar = function( application, req, res ){

    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var dadosForms = req.body;
    req.assert('cpfcnpj', 'O cpf ou cnpj é obrigatório').notEmpty();
    req.assert('nome', 'O Nome é obrigatório').notEmpty();       
    req.assert('funcionario', 'O Funcionário é obrigatório').notEmpty(); 
    var erros = req.validationErrors();

    if(erros){
      
        res.render('clienteEditar', {validacao: erros,  clientes: [dadosForms], funcionarios:{}, sessao: req.session.usuario});
        return;
    }
    
    var connection = application.config.dbConnection();
    var clienteDao = new application.app.models.ClienteDAO(connection);
    var funcionariosDao = new application.app.models.FuncionarioDAO(connection);
 
    funcionariosDao.listar(function(error, funcionarios){        
    
        clienteDao.salvar(dadosForms, function(error, result){
            connection.end();    
            if( error ) {
                res.render('clienteEditar', { validacao : [ {'msg': error.sqlMessage }], clientes : [dadosForms], funcionarios: funcionarios, sessao: req.session.usuario });
                return;
            }
            res.redirect('/cliente');
        });
    });
     
}