import Formulaire from "./Formulaire.js";
import Tache from "./Tache.js";
import TrierTaches from "./TrierTaches.js";
import Detail from "./Detail.js";

(function() {

    let elsFormulaire = document.querySelectorAll('[data-js-formulaire]'),
        elsTaches = document.querySelectorAll('[data-js-tache]'),
        elsTrierTaches = document.querySelector('[data-js-trier-taches]'),
        elsDetail = document.querySelectorAll('[data-js-detail]');

    for (let i = 0, l = elsFormulaire.length; i < l; i++) {
        new Formulaire(elsFormulaire[i]);
    }

    for (let i = 0, l = elsTaches.length; i < l; i++) {
        new Tache(elsTaches[i]);
    }
   
    new TrierTaches(elsTrierTaches);

    for (let i = 0, l = elsDetail.length; i < l; i++) {
        new Detail(elsDetail[i]);
    }
})(); 