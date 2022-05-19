import express from 'express'
import routerProductos from './router/productos.js'
import routerCarrito from './router/carrito.js'
import config from './config.js'

//import ProductoModelMongoDB from './model/productos-mongodb.js'
//ProductoModelMongoDB.conectarDB()

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)


// ------- Server Listen --------
const PORT = process.env.PORT || config.PORT
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en el puerto ${PORT}`))
server.on('error', error => console.log(`Error en servidor express: ${error.message}`))
