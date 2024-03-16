import App from "./App.js";
import { aTaches } from "./aTaches.js";

export default class TrierTaches extends App {
    
    #_el;
    #_elListTaches;

    constructor(el) {
        super();
        this.#_el = el;
        this.#_elListTaches = document.querySelector('[data-js-trier-taches]');
        this._elTaches = this.#_el.querySelectorAll('[data-js-tache]');
        this._elBtns = document.querySelectorAll('[data-js-trier]');

        this.init();
    }

    /**
     * Initialise les comportements
     */
    init() {

        this._elBtns.forEach(function(bouton) {
            bouton.addEventListener('click', function(e) {
                let ordre = e.target.dataset.jsTrier;
                this.trieTaches(ordre);
            }.bind(this));

        }.bind(this)) 
    }


    /**
     * Réordonne le tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
     * @param {String} propriete 
     */
    trieTaches(propriete) {

        // function qui va trier les taches, soit en order alphabetique, soit en order d'importance
       const aTaches = Array.from(this._elTaches );
        let sorted = aTaches.sort(function(a, b) {
            let x = a.querySelector(`[data-js-tache-${propriete}]`).getAttribute(`data-${propriete}`);
            let y = b.querySelector(`[data-js-tache-${propriete}]`).getAttribute(`data-${propriete}`);
        
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });
        
        // Réinjecte les tâches dans l'ordre
        this.#_elListTaches.innerHTML = '';
        sorted.forEach(function(e) {
            this.#_elListTaches.appendChild(e);
        }.bind(this))
    }
}