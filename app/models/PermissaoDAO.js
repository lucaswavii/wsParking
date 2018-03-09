function PermissaoDAO( connection ){
	this._connection = connection; 
}


PermissaoDAO.prototype.listar = function( permissao, callback) {
	this._connection.query('select * from PERMISSAO where grupo = ? and modulo = ? order by id', [ permissao.grupo, permissao.modulo], callback);	
}

PermissaoDAO.prototype.salvar = function( permissao, callback) {	
	if( !permissao.id ) {
		this._connection.query('insert into PERMISSAO set ?', permissao, callback);
	} else {
		this._connection.query('update PERMISSAO set ? where id = ?', [ permissao, permissao.id], callback);	
	}
}

PermissaoDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from PERMISSAO where grupo = ?', id, callback);
}

PermissaoDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from PERMISSAO where id = ?', id, callback);	
}

module.exports = function(){
	return PermissaoDAO;
};
