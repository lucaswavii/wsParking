function IndexDAO( connection ){
	this._connection = connection; 
}

IndexDAO.prototype.listar = function( callback) {
    var sql = "select cast('Total Mês' as char(30)) as tipo, count(*) as prospeccoes from PROSPECCAO "
    sql += " where data >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE())-1 DAY) " 
    sql += " union "
    sql += " select cast('Total Dia' as char(30)) as tipo, count(*) as prospeccoes from PROSPECCAO "
    sql += " where data = CURDATE() "
    sql += " union "
    sql += " select cast('Total Venda Mês' as char(30)) as tipo, count(*) as prospeccoes from PROSPECCAO pp "
    sql += " inner join VENDAS vv on ( vv.prospeccao = pp.id) "
    sql += " where pp.data >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE())-1 DAY) " 
    sql += " union "
    sql += " select cast('Total Financeiro Mês' as char(30)) as tipo, count(*) as prospeccoes from PROSPECCAO pp "
    sql += " inner join VENDAS vv on ( vv.prospeccao = pp.id) "
    sql += " inner join FINANCEIRO ff on ( vv.id = ff.vendas ) "
    sql += " where pp.data >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE())-1 DAY) " 
    sql += " and ff.baixa is not null "
    
	this._connection.query(sql, callback);	
}

module.exports = function(){
	return IndexDAO;
};
