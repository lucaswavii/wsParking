/*importar o módulo do crypto */
var crypto = require('crypto');

function UsuarioDAO( connection ){
	this._connection = connection; 
}

UsuarioDAO.prototype.autenticar = function( usuario, callback) {
	var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");
	usuario.senha = senha_criptografada;
	this._connection.query('select * from USUARIO where empresa=? and nome=? and senha=?', [ usuario.empresa, usuario.nome, usuario.senha], callback);	
}

UsuarioDAO.prototype.esqueci = function( usuario, callback) {
	this._connection.query('select * from USUARIO where empresa=? and nome=?', [ usuario.empresa, usuario.nome ], callback);	
}

UsuarioDAO.prototype.listar = function( callback) {
	this._connection.query('select * from USUARIO order by id', callback);	
}

UsuarioDAO.prototype.salvar = function( usuario, callback) {	

	var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");
	usuario.senha = senha_criptografada;
	
	if( !usuario.id ) {
		this._connection.query('insert into USUARIO set ?', usuario, callback);
	} else {
		this._connection.query('update USUARIO set ? where id = ?', [ usuario, usuario.id], callback);	
	}
}

UsuarioDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from USUARIO where id = ?', id, callback);
}

UsuarioDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from USUARIO where id = ?', id, callback);	
}

module.exports = function(){
	return UsuarioDAO;
};
