ALTER TABLE funcionarios add index idx_01 (nr_func) ;

ALTER TABLE salarios add index idx_01 (nr_func) ;

OPTIMIZE TABLE funcionarios;

OPTIMIZE TABLE salarios;

SELECT SQL_NO_CACHE COUNT(*), `nome_func`, `sobrenome_func`, SUM(`salario`) AS soma_salario
FROM `funcionarios`, `salarios` WHERE funcionarios.nr_func = salarios.nr_func
GROUP BY nome_func, sobrenome_func ORDER BY soma_salario DESC;