<?php
$connexion = connexionDB();

/**
 * Connection avec la base de données
 */
function connexionDB()
{
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASSWORD', '');

    // $laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
    $laConnexion = mysqli_connect('localhost', 'root', '', 'to-do-list', '3308');

    if (!$laConnexion) {
        // La connexion n'a pas fonctionné
        die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
    }

    $db = mysqli_select_db($laConnexion, 'to-do-list');

    if (!$db) {
        die('La base de données n\'existe pas.');
    }

    mysqli_query($laConnexion, 'SET NAMES "utf8"');
    return $laConnexion;
}


/**
 * Exécute la requête SQL
 * Si le paramètre $insert est true, retourne l'id de la ressource ajoutée à la db
 */
function executeRequete($requete, $insert = false)
{
    global $connexion;
    if ($insert) {
        mysqli_query($connexion, $requete);
        $resultats = $connexion->insert_id;
    } else {
        $resultats = mysqli_query($connexion, $requete);
    }
    return $resultats;
}


/**
 * Retourne la liste de taches
 */
function getAllTasks()
{
    return executeRequete("SELECT * FROM taches");
}


/**
 * Retourne la tache reçue en paramètre
 */
function getTask($id)
{
    global $connexion;
    $id = mysqli_real_escape_string($connexion, $id);

    return executeRequete("SELECT * FROM taches WHERE id = " . $id);
}


/**
 * Retourne la liste des taches selon a) ordre alphabetique ou b) l'ordre d'importance
 */
function getTasksOrganises($criteria)
{
    global $connexion;

    if ($criteria == "alphabetic") {
        return executeRequete("SELECT * FROM taches ORDER BY tache ASC");
    } else if ($criteria == "important") {
        return executeRequete("SELECT * FROM taches ORDER BY importance ASC");
    }
}


/**
 * Ajouter nouvelle tache
 */
function addTask($tache, $description, $importance)
{
    $query = "INSERT INTO taches (`tache`, `description`, `importance`) 
				  VALUES ('" . $tache . "','" . $description . "','" . $importance  . "')";
    return executeRequete($query, true);
}

/**
 * Supprime l'équipe reçue en paramètre
 */
function supprimeTask($id)
{
    $query = "DELETE FROM taches WHERE id = " . $id;
    return executeRequete($query, false);
}
