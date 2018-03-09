function TipoFuncionarioDAO( connection ){
	this._connection = connection; 
}

TipoFuncionarioDAO.prototype.listar = function( callback) {
	this._connection.query('select * from TIPOFUNCIONARIO order by id', callback);	
}

TipoFuncionarioDAO.prototype.salvar = function( tipoFuncionarios, callback) {	
	if( !tipoFuncionarios.id ) {
		this._connection.query('insert into TIPOFUNCIONARIO set ?', tipoFuncionarios, callback);
	} else {
		this._connection.query('update TIPOFUNCIONARIO set ? where id = ?', [ tipoFuncionarios, tipoFuncionarios.id], callback);	
	}
}

TipoFuncionarioDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from TIPOFUNCIONARIO where id = ?', id, callback);
}

TipoFuncionarioDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from TIPOFUNCIONARIO where id = ?', id, callback);	
}

module.exports = function(){
	return TipoFuncionarioDAO;
};
