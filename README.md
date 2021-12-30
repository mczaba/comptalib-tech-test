Le pokedex est composé de 2 pages : 
/ contenant la liste des 150 premiers pokémons 
/pokemon/:id comprenant les infos détaillées (stats, types, dimensions, liste des techniques) de chaque pokemon. 

La liste des 150 pokemons ainsi que les détails pour chaque pokemon sont sauvegardés dans le state afin de ne pas refaire l'appel à chaque visite de page.

Le lazyloading des images sur le composant PokeCard est géré par la directive est n'est activé que si le composant est chargé depuis la liste des 150pokemons et non depuis le modal de l'équipe.

L'utilisateur peut ajouter un pokemon à son équipe depuis la page du pokemon, et afficher son équipe en cliquant sur le bouton "team". L'équipe ne peut pas comprendre plus de 6 pokemons et peut comprendre plusieurs fois le même pokemon.

# Todo / idées d'amélioration
- Rendre les techniques cliquables pour avoir des détails sur la technique, soit via une nouvelle page soit via un modal.
- Utiliser un drag n drop pour permettre à l'utilisateur de modifier l'ordre de son équipe.
