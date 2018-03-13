function CorDAO( connection ){
	this._connection = connection; 
}

CorDAO.prototype.listar = function( callback) {
	this._connection.query('select * from COR order by id', callback);	
}

CorDAO.prototype.salvar = function( cor, callback) {	
	if( !cor.id ) {
		this._connection.query('insert into COR set ?', cor, callback);
	} else {
		this._connection.query('update COR set ? where id = ?', [ cor, cor.id], callback);	
	}
}

CorDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from COR where id = ?', id, callback);
}

CorDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from COR where id = ?', id, callback);	
}

module.exports = function(){
	return CorDAO;
};
