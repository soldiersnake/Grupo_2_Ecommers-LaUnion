let products = [
    {
        id: 1,
        name: 'Batman Their Dark Designs. Part 5',
        description: 'El misterioso maestro criminal conocido solo como el Diseñador una vez juntó a los mayores criminales de Ciudad Gótica para planear el crimen perfecto, y ahora su plan se ha desatado sobre la ciudad con toda su grandeza. Batman hará todo lo posible para descubrir lo que trama, pero Catwoman es la que guarda el mayor secreto. Si Batman gana contra el Diseñador, entonces lo perderá todo.',
        price: 18000,
        imagen: '/img/comic1.jpg',
        categoryId: 1
    },
    {
        id: 2,
        name: "Green Arrow: Rebirth",
        description: 'La vida de Green Arrow cambió para siempre al ser traicionado por alguien cercano a él. Su relación con Black Canary fuerza a Ollie a enfrentarse al hecho de que no puede luchar contra «el hombre» si él es «el hombre». Uno a uno todos sus amigos empiezan a abandonarlo y ni todo el dinero del mundo los traerá de vuelta.',
        price: 18000,
        imagen: '/img/comic2.jpg',
        categoryId: 1
    },
    {
        id: 3,
        name: "Avengers To the death!",
        description: 'En el proceso de ser absorbida por la Dimensión Oscura de Dormammu la Tierra se está transformando en un reino de locura. Los Vengadores y los Defensores viajan a la Dimensión Oscura para detener a Dormammu. Allí deberán enfrentarse antes con los Sin Mente, habitantes irracionales de esa dimensión. Cuando por fin encuentran a Dormammu, sólo la distracción que les proporciona Loki permitirá a la Bruja Escarlata conjurar un hechizo que produce la desaparición de Dormammu al ser absorbida su esencia por el Ojo del Mal y ser liberada sobre la cara de Loki, quién recupera la visión pero su cerebro se derrumba convirtiendose en el de un bebe.',
        price: 16000,
        imagen: '/img/comic3.jpg',
        categoryId: 1
    },
    {
        id: 4,
        name: "The amazing spiderman Exposed Wiring",
        description: 'Max Dillon está siendo atado a una silla eléctrica. Mientras lo hacen, piensa que esto era un truco que solían hacer durante su época en el Carnaval de Steuben Ahora, sin embargo, está atormentado por el miedo a lo que va a pasar. Temiendo que esto pueda significar su muerte, la vida de Dillon pasa ante sus ojos. Piensa en su infancia en Endicott, Nueva York. Él y su madre vivían bajo el dominio abusivo del padre de Max, un contable más centrado en su carrera que en su familia. Al final, Jonathan Dillon se cansó de su mujer y su hijo y de cómo lo arrastraban y se marchó. Su madre se quedó sola para criar a Max y pronto se volvió dominante y sobreprotectora. Mientras se sienta en la silla eléctrica, Max Dillon puede perdonar a su madre por cómo le ha criado, sabiendo muy bien que hay peores crímenes de los que ser acusado.',
        price: 16000,
        imagen: '/img/comic4.jpg',
        categoryId: 1
    },
    {
        id: 5,
        name: 'Star Wars Jedi: La Orden caída',
        description: 'Después de la Orden 66, que inició la purga de la Orden Jedi en toda la galaxia, los jugadores toman el control del Padawan Cal Kestis (interpretado por Cameron Monaghan), uno de los últimos Jedi supervivientes. Durante la historia, Cal se somete a duras pruebas en su camino para superar el traumático pasado, que dejó como secuela el fin de la guerra de los clones.',
        price: 120000,
        imagen: '/img/juego1.jpg',
        categoryId: 2
    },
    {
        id: 6,
        name: 'Marvels Avengers Game',
        description: 'Durante la inauguración de la nueva base de operaciones de Los Vengadores, en el A-Day, un ataque terrorista envuelve a la ciudad en caos, una batalla en la que pierden la vida cientos de inocentes. Con Los Vengadores derrotados y ganándose el repudio del público, la empresa A.I.M. toma el control de la seguridad de la ciudad, creando androides patrulleros que se encargan de hacer la labor que antes hacían Los Vengadores, pero mientras las intenciones de A.I.M. parecen nobles, en el fondo se forma una conspiración para acabar de una vez con todos los héroes. Solo una joven súper humana, Kamala Khan, puede reunir de nuevo a los héroes más poderosos del planeta y detener los planes malignos de A.I.M.',
        price: 160000,
        imagen: '/img/juego2.jpg',
        categoryId: 2
    },
    {
        id: 7,
        name: 'Batman: Arkham Knight Premium Edition',
        description: 'En este explosivo desenlace, Batman se enfrenta a la mayor amenaza para la ciudad que ha jurado proteger, cuando el Espantapájaros reaparece para unir a todos los supervillanos de Gotham y jura destruir al murciélago de una vez para siempre.',
        price: 200000,
        imagen: '/img/juego3.jpg',
        categoryId: 2 
    },
    {
        id: 8,
        name: 'Watchmen: el fin está cerca',
        description: 'Corre el año 1985 en unos Estados Unidos que no son los que conocemos. En este mundo los superhéroes son muy reales, pero han sido declarados fuera de la ley. Un antiguo héroe descubre un complot para destruir el mundo a partir de la muerte de uno de sus antiguos compañeros. Y eso significa: de vuelta al trabajo. Pero no de la manera que él cree. Y mejor no desvelar nada más.',
        price: 50000,
        imagen: '/img/juego4.jpg',
        categoryId: 2
    },
    {
        id: 9,
        name: 'Dragonball Z Goku SSJ3',
        description: {
            peso: '250gr',
            medidas: '30x28x20cm',
            articulaciones: false
        },
        price: 150000,
        imagen: '/img/figura1.png',
        categoryId: 3
    },
    {
        id: 10,
        name: 'Saint Seiya armadura de bronce',
        description: {
            peso: '250gr',
            medidas: '30x28x20cm',
            articulaciones: true
        },
        price: 120000,
        imagen: '/img/figura2.png',
        categoryId: 3
    },
    {
        id: 11,
        name: 'Neon genesis evangelion Eva-01',
        description: {
            peso: '250gr',
            medidas: '30x28x20cm',
            articulaciones: false
        },
        price: 150000,
        imagen: '/img/figura3.png',
        categoryId: 3
    },
    {
        id: 12,
        name: 'Star Wars Darth Maul',
        description: {
            peso: '250gr',
            medidas: '30x28x20cm',
            articulaciones: true
        },
        price: 250000,
        imagen: '/img/figura4.png',
        categoryId: 3
    }
]

module.exports = products;