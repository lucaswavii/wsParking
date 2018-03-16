function VeiculoDAO( connection ){
	this._connection = connection; 
}

VeiculoDAO.prototype.listar = function( callback) {
	this._connection.query('select v.id, v.nome, v.placa, t.nome as tipo, t1.nome as cor from VEICULO v	inner join tipo t on (t.id = v.tipo ) inner join cor t1 on (t1.id = v.cor ) order by v.id', callback);	
}

VeiculoDAO.prototype.salvar = function( veiculo, callback) {	
	
	if( !veiculo.id ) {
		this._connection.query('insert into VEICULO set ?', veiculo, callback);
	} else {
		this._connection.query('update VEICULO set ? where id = ?', [ veiculo, veiculo.id], callback);	
	}
}

VeiculoDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from VEICULO where id = ?', id, callback);
}

VeiculoDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from VEICULO where id = ?', id, callback);	
}

module.exports = function(){
	return VeiculoDAO;
};
