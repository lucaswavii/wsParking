module.exports.index = function( application, req, res ){
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    this._meuIp = require('ip');
    
    var ip = this._meuIp.address();
    var connection = application.config.dbConnection();
    var pdvDao = new application.app.models.PdvDAO(connection);
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var caixaDao = new application.app.models.CaixaDAO(connection);
    caixaDao.pegaEcf( ip, function(error, caixas){
        
        if( caixas.length == 0 ) {
            connection.end();
                
            res.render('pdv', { validacao : [ {'msg': 'Não existe caixa configurado para o IP:' + ip }], pdvs : {}, funcionarios: {}, caixas: {}, sessao: req.session.usuario });        
            return;
        }

        funcionarioDao.listar(function(error, funcionarios){
    
            pdvDao.listar(function(error, pdvs){
                
                connection.end();
                
                if( error ) {
                    res.render('pdv', { validacao : [ {'msg': error.sqlMessage }], pdvs : {}, funcionarios: {}, caixas: {}, sessao: req.session.usuario });
                    return;
                }
                res.render('pdv', { validacao : {}, pdvs : pdvs, funcionarios: funcionarios, caixas: caixas, sessao: req.session.usuario });
            });
        });
    });
}


module.exports.editar = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
	}
    var connection = application.config.dbConnection();
    var pdvDao = new application.app.models.PdvDAO(connection);
    
    pdvDao.editar( req.params._id, function(error, pdvs){
        connection.end();
        if( error ) {
            res.render('pdv', { validacao : [ {'msg': error.sqlMessage }], pdvs : {}, sessao: req.session.usuario });
            return;
        }
        res.render('pdv', { validacao : {}, pdvs : pdvs, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }
    
    var connection = application.config.dbConnection();
    var pdvDao = new application.app.models.PdvDAO(connection);
    
    pdvDao.excluir( req.params._id, function(error, pdvs){
        connection.end();
        if( error ) {
            res.render('pdv', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], pdvs : {}, sessao: req.session.usuario });
            return;
        }
        res.redirect("/pdv");
    });
}

module.exports.salvar = function( application, req, res ){

    if( req.session.usuario == undefined ) {
		res.redirect("login")			
    }

    this._meuIp = require('ip');
    
    var ip = this._meuIp.address();
    
    
    var dadosForms = req.body;
    req.assert('caixa', 'Caixa é obrigatório').notEmpty();
    req.assert('funcionario', 'Funcionário é obrigatório').notEmpty();
    req.assert('abertura', 'Data abertura é obrigatório').notEmpty();
    
    var erros = req.validationErrors();

    if(erros){
      
        var pdvDao = new application.app.models.PdvDAO(connection);
        var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
        var caixaDao = new application.app.models.CaixaDAO(connection);
        caixaDao.pegaEcf( ip, function(error, caixas){
            
            if( caixas.length == 0 ) {
                connection.end();
                
                res.render('pdv', { validacao : [ {'msg': 'Não existe caixa configurado para o IP:' + ip }], pdvs : {}, funcionarios: {}, caixas: {}, sessao: req.session.usuario });        
                return;
            }

            funcionarioDao.listar(function(error, funcionarios){
    
                pdvDao.listar(function(error, pdvs){
                    
                    connection.end();
                
                    if( error ) {
                        res.render('pdv', { validacao : [ {'msg': error.sqlMessage }], pdvs : {}, funcionarios: {}, caixas: {}, sessao: req.session.usuario });
                        return;
                    }
                    res.render('pdv', { validacao :  [ {'msg': erros }], pdvs : pdvs, funcionarios: funcionarios, caixas: caixas, sessao: req.session.usuario });
                });
            });
        });
    }
    if( !dadosForms.id ) {
        dadosForms.fundo =  parseFloat(dadosForms.fundo.replace('.','').replace(',','.'));
        dadosForms.saldo =  parseFloat(dadosForms.saldo.replace('.','').replace(',','.'));

    }

    var connection = application.config.dbConnection();
    var pdvDao = new application.app.models.PdvDAO(connection);        
    var pdvDao = new application.app.models.PdvDAO(connection);
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var caixaDao = new application.app.models.CaixaDAO(connection);
    caixaDao.pegaEcf( ip, function(error, caixas){
        
        if( caixas.length == 0 ) {
            connection.end();
            
            res.render('pdv', { validacao : [ {'msg': 'Não existe caixa configurado para o IP:' + ip }], pdvs : {}, funcionarios: {}, caixas: {}, sessao: req.session.usuario });        
            return;
        }

        funcionarioDao.listar(function(error, funcionarios){
     
            pdvDao.salvar(dadosForms, function(error, result){
                
                connection.end();
                res.redirect('/pdv')
            
            });
        });
    });
      
}