<?php
include 'ManipuladorBanco.php';
$banco = new ManipuladorBanco();
$nomeTabela = '';

if (isset($_REQUEST['type']) && !empty($_REQUEST['type'])) {
    $tipo = $_REQUEST['type'];
    switch ($tipo) {
        case "testar":
            $nomeTabela = 'tabela1_backup';
            $registros = $banco->getLinhas($nomeTabela);
            if ($registros) {
                $dados['registros'] = $banco->getLinhas($nomeTabela);
                $dados['status'] = 'OK';
            } else {
                $dados['registros'] = array();
                $dados['status'] = 'ERR';
            }
            echo json_encode($dados);
            break;
        case "buscar":
            $nomeTabela ='tabela1';
            $registros = $banco->getLinhas($nomeTabela);
            if ($registros) {
                $dados['registros'] = $banco->getLinhas($nomeTabela);
                $dados['status'] = 'OK';
            } else {
                $dados['registros'] = array();
                $dados['status'] = 'ERR';
            }
            echo json_encode($dados);
            break;
        case "adicionar":
            $nomeTabela ='tabela1';
            if (!empty($_POST['dados'])) {
                $dadosUsuario = array(
                    'nome' => $_POST['dados']['nome'],
                    'email' => $_POST['dados']['email'],
                    'senha' => $_POST['dados']['senha']
                );
                $insert = $banco->inserir($nomeTabela, $dadosUsuario);
                if ($insert) {
                    $dados['dados'] = $insert;
                    $dados['status'] = 'OK';
                    $dados['msg'] = 'DADOS CADASTRADOS COM SUCESSO';
                } else {
                    $dados['status'] = 'ERR';
                    $dados['msg'] = 'Algum problema ocorreu, por favor tente novamente.';
                }
            } else {
                $dados['status'] = 'ERR';
                $dados['msg'] = 'Algum problema ocorreu, por favor tente novamente.';
            }
            echo json_encode($dados);
            break;
        default:
            echo '{"status":"INVALID"}';
    }
}