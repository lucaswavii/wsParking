function BancoDAO( connection ){
	this._connection = connection; 
}

BancoDAO.prototype.listar = function( callback) {
	this._connection.query('select * from BANCO order by id', callback);	
}

BancoDAO.prototype.salvar = function( banco, callback) {	
	if( !banco.id ) {
		this._connection.query('insert into BANCO set ?', banco, callback);
	} else {
		this._connection.query('update BANCO set ? where id = ?', [ banco, banco.id], callback);	
	}
}

BancoDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from BANCO where id = ?', id, callback);
}

BancoDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from BANCO where id = ?', id, callback);	
}

module.exports = function(){
	return BancoDAO;
};
