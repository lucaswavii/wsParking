function ModuloDAO( connection ){
	this._connection = connection; 
}

ModuloDAO.prototype.listar = function( callback) {
	this._connection.query('select * from MODULO order by id', callback);	
}

ModuloDAO.prototype.salvar = function( pagamento, callback) {	
	if( !pagamento.id ) {
		this._connection.query('insert into MODULO set ?', pagamento, callback);
	} else {
		this._connection.query('update MODULO set ? where id = ?', [ pagamento, pagamento.id], callback);	
	}
}

ModuloDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from MODULO where id = ?', id, callback);
}

ModuloDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from MODULO where id = ?', id, callback);	
}

module.exports = function(){
	return ModuloDAO;
};
