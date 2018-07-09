<?php

class DB
{
    private $dbHost = 'localhost';
    private $dbUsername = 'root';
    private $dbPassword = 'nheac4257';
    private $dbName = 'eduardo';
    public $db;


    public function __construct()
    {
        if (!isset($this->db)) {
            try {
                $conn = new PDO("mysql:host=" . $this->dbHost . ";dbname=" . $this->dbName, $this->dbUsername, $this->dbPassword);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->db = $conn;
            } catch (PDOException $e) {
                die("Falha ao conectar com MySQL: " . $e->getMessage());
            }
        }
    }

    /*
     * retorna linhas do banco baseado nas @condicoes
     * @param string name of the tabela
     * @param array select, where, order_by, limit and return_type condicoes
     */

    public function getRows($tabela, $condicoes = array())
    {
        $sql = 'SELECT ';
        $sql .= array_key_exists("select", $condicoes) ? $condicoes['select'] : '*';
        $sql .= ' FROM ' . $tabela;
        if (array_key_exists("where", $condicoes)) {
            $sql .= ' WHERE ';
            $i = 0;
            foreach ($condicoes['where'] as $key => $value) {
                $pre = ($i > 0) ? ' AND ' : '';
                $sql .= $pre . $key . " = '" . $value . "'";
                $i++;
            }
        }

        if (array_key_exists("order_by", $condicoes)) {
            $sql .= ' ORDER BY ' . $condicoes['order_by'];
        }

        if (array_key_exists("start", $condicoes) && array_key_exists("limit", $condicoes)) {
            $sql .= ' LIMIT ' . $condicoes['start'] . ',' . $condicoes['limit'];
        } elseif (!array_key_exists("start", $condicoes) && array_key_exists("limit", $condicoes)) {
            $sql .= ' LIMIT ' . $condicoes['limit'];
        }

        $query = $this->db->prepare($sql);
        $query->execute();

        if (array_key_exists("return_type", $condicoes) && $condicoes['return_type'] != 'all') {
            switch ($condicoes['return_type']) {
                case 'count':
                    $data = $query->rowCount();
                    break;
                case 'single':
                    $data = $query->fetch(PDO::FETCH_ASSOC);
                    break;
                default:
                    $data = '';
            }
        } else {
            if ($query->rowCount() > 0) {
                $data = $query->fetchAll(PDO::FETCH_ASSOC);
            }
        }
        return !empty($data) ? $data : false;
    }

    public function insert($tabela, $data)
    {
        if (!empty($data) && is_array($data)) {
            $columns = '';
            $values = '';
            $i = 0;
            if (!array_key_exists('criado', $data)) {
                $data['criado'] = date("Y-m-d H:i:s");
            }


            $columnString = implode(',', array_keys($data));
            $valueString = ":" . implode(',:', array_keys($data));
            $sql = "INSERT INTO " . $tabela . " (" . $columnString . ") VALUES (" . $valueString . ")";
            $query = $this->db->prepare($sql);
            foreach ($data as $key => $val) {
                $val = htmlspecialchars(strip_tags($val));
                $query->bindValue(':' . $key, $val);
            }
            $insert = $query->execute();
            if ($insert) {
                $data['id'] = $this->db->lastInsertId();
                return $data;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
