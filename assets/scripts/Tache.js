import App from "./App.js"; 
import { aTaches } from "./aTaches.js";

export default class Tache extends App {
    constructor(el) {
        super();
        this._el = el;
        this._index = this._el.dataset.jsTache;
        this._elActions = this._el.querySelector('[data-js-actions]');
        this._elTaches = this._el.closest('[data-js-trier-taches]');
        this._elTacheDetail = document.querySelector('[data-js-tache-detail]');

        this.supprimeTache = this.supprimeTache.bind(this);
        this.afficheDetail = this.afficheDetail.bind(this);

        this.init();
       
    }


    /**
     * Initialise les comportements
     */
    init() {
      
        this._elActions.addEventListener('click', function(e) {
            if (e.target.dataset.jsAction == 'afficher') this.afficheDetail();
            else if (e.target.dataset.jsAction == 'supprimer') this.supprimeTache();
        }.bind(this));
    }

 
    /**
     * Affiche le détail d'une tâche
     */
    afficheDetail() {
    
        let tache = this._el.querySelector('[data-js-tache-tache]').dataset.tache;
        let description = this._el.querySelector('[data-js-tache-description]').dataset.description;
        let importance = this._el.querySelector('[data-js-tache-importance]').dataset.importance;

        let elDetailDom =  `<div class="detail__info">
                                <p><small>Tâche : </small>${tache}</p>
                                <p><small>Description : </small>${description ? description : 'Aucune description disponible.'}</p>
                                <p><small>Importance : </small>${importance}</p>
                            </div>`;

        this._elTacheDetail.innerHTML = elDetailDom;
    }


    /**
     * Supprime la tâche du tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
     */
    supprimeTache() {
        let tache = {
            tacheId: this._index,
        }

        //appel fetch
        let data = {
            action: 'supprimeTache',
            tache: tache
        }

        let oOptions = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        /**
         * Gestion asynchrone
         */

        fetch(`requetes/requetesAsync.php`, oOptions)
            .then(function(reponse) {
                if (reponse.ok) return reponse.json();
                else throw new Error('La réponse n\'est pas OK');
            })
            .then(function(data) {
                if (data) {
                    this._el.remove();
                } else {
                    console.log("error");
                }
            }.bind(this))
            .catch (function(erreur) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${erreur.message}`);
            });
    }
}