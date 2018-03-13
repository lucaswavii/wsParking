function PdvDAO( connection ){
	this._connection = connection; 
}

PdvDAO.prototype.listar = function( callback) {
	this._connection.query('select * from PDV where fechamento is null order by id', callback);	
}

PdvDAO.prototype.salvar = function( pdv, callback) {	
	if( !pdv.id ) {
		this._connection.query('insert into PDV set ?', pdv, callback);
	} else {
		this._connection.query('update PDV set ? where id = ?', [ pdv, pdv.id], callback);	
	}
}

PdvDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from PDV where id = ?', id, callback);
}

PdvDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from PDV where id = ?', id, callback);	
}

module.exports = function(){
	return PdvDAO;
};
