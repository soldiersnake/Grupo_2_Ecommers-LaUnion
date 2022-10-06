const fs = require('fs');
const path = require('path');

//funcion para enlistar todos los productos
function findAllProducts(){
    const jsonDataProducts = fs.readFileSync(path.join(__dirname, '../data/products.json'));
    const products = JSON.parse(jsonDataProducts);
    return products;
}
//funcion para enlistar todos las categorias
function findAllCategories(){
    const jsonDataCategories = fs.readFileSync(path.join(__dirname, '../data/categories.json'));
    const categories = JSON.parse(jsonDataCategories);
    return categories;
}
//funcion para añadir los datos a nuestro productsController
function writeFile(products){
    // ,null y ,4 sirven para formatear el json
    const dataString = JSON.stringify(products, null, 4);
    //sobreescribimos todo el archivo con la nueva informacion:
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), dataString);
}

const productsController = {
    detalle: function(req, res, next) {
        const products = findAllProducts();
        let productFound = products.find(producto => {
            return producto.id == req.params.id
        });
        res.render('./products/detalle-producto', {product : productFound});
    },
    
    biblioteca: function(req, res){
        const products = findAllProducts();
        const categories = findAllCategories();
        res.render('./products/biblioteca', {products, categories});
    },
    juegos: function(req, res){
        const products = findAllProducts();
        const categories = findAllCategories();
        res.render('./products/juegos', {products, categories});
    },
    figuras: function(req, res){
        const products = findAllProducts();
        const categories = findAllCategories();
        res.render('./products/figuras', {products, categories});
    },

    carrito: function(req, res, next) {
        const products = findAllProducts();
        let productToBuy = products.find(producto => {
            return producto.id == req.params.id;
        });
        res.render('./products/carrito', {product : productToBuy});
    },
    create: function(req, res) {
        res.render("./products/create");
    },
    store: function(req, res){
        //obetenemos la info de los productos:
        const products = findAllProducts();
        // obtenemos los datos del registro del formulario create.ejs
        const newProduct = {
            //sumamos 1 al tamaño del archivo para que el id siga creciendo de uno en uno
            id: products.length + 1,
            name: req.body.name,
            price: Number(req.body.price),
            description: req.body.description,
            //agregamos la propidead image para guardarla en el objeto nuevo con el atributo req.file que se usa en multer para obtener los atributos de la imagen que se subió al sistema
            imagen: req.file.filename,
            categoryId: req.body.categoryId
        }
        // agregamos el nuevo producto a nuesto arreglo de productos:
        products.push(newProduct);
        // llamamos a la funcion create para sobreescribir la lista de productos que tenemos en la carpeta data
        writeFile(products);
        // redirigir a un enlace de confirmacion, o algo...
        res.redirect('/');
    },
    edit: function(req, res) {
        const products = findAllProducts();
        let productToEdit = products.find(producto => {
            return producto.id == req.params.id;
        });
        res.render("./products/edit", { product : productToEdit});
    },
    update: (req, res) => {
        //buscamos todos los productos que tenemos
        const products = findAllProducts();
        //encontramos el plato con el id que vamos a editar y lo retornamos
        const productToUpdate = products.find( function(producto){
            return producto.id == req.params.id;
        });
        //agregamos los nuevos valores al item editado platoEncontrado que es una referencia a la constante data
        productToUpdate.name = req.body.name;
        productToUpdate.description = req.body.description;
        productToUpdate.price = req.body.price;
        productToUpdate.categoryId = req.body.categoryId;
        
        //sobreescribimos el registro en nuestro archivo js pasando data
        writeFile(products);
        //redirigimos
        res.redirect('/');
    }, 
    delete: (req, res) => {
        const products = findAllProducts();
        const productToDelete = products.find( function(producto){
            return producto.id == req.params.id;
        });
        //borramos del proyecto la imagen adjunta al objeto:
        fs.unlinkSync(path.join(__dirname,"../public/img/", productToDelete.imagen)); 
        //borramos el producto del archivo de productos
        products.splice(products.findIndex(function(producto){
            return producto.id == req.params.id;
        }), 1);
        writeFile(products);
        //redirigimos
        res.redirect('/');
    }
}

module.exports = productsController;