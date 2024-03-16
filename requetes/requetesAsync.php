<?php
require_once('functionsDB.php');



$request_payload = file_get_contents('php://input');
$data_requete = json_decode($request_payload, true);
error_log(print_r($data_requete, true));

if (isset($data_requete['action'])) {

    // Switch en fonction de l'action envoyée
    switch ($data_requete['action']) {

        case 'ajouterTache':

            $tacheAjoutee = addTask(
                $data_requete['tache']['tache'],
                $data_requete['tache']['description'],
                $data_requete['tache']['importance']
            );

            if ($tacheAjoutee) {
                $data_reponse = true;
            } else {
                $data_reponse = false;
            }

            header('Content-type: application/json; charset=utf-8');
            echo json_encode($data_reponse);
            break;

        case 'supprimeTache':

            $deleteTache = supprimeTask($data_requete['tache']['tacheId']);

            error_log($deleteTache);

            if ($deleteTache) {
                $data_reponse = true;
            } else {
                $data_reponse = false;
            }

            header('Content-type: application/json; charset=utf-8');
            echo json_encode($data_reponse);
            break;
    }
} else {
    echo 'Erreur action';
}
