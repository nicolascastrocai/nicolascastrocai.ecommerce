//https://mongoosejs.com/
import mongoose from 'mongoose'
import config from '../config.js'

/* ---------------------------------------------------------------- */
/* Esquema del documento producto */
const productoSchema = mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    marca: String,
    categoria: String,
    detalles: String,
    foto: String,
    envio: Boolean
})

/* Modelo del documento almacenado en una colección */
const ProductoModel = mongoose.model('productos', productoSchema)
/* ---------------------------------------------------------------- */

class ProductoModelMongoDB {
    static conexionOk = false

    static async conectarDB() {
        try {
            await mongoose.connect(config.STR_CNX, {
                useNewUrlParser : true,
                useUnifiedTopology: true
            })
            console.log('Base de datos conectada!')
            ProductoModelMongoDB.conexionOk = true
        }
        catch(error) {
            console.log(`MongoDB error en conectar: ${error.message}`)
        }
    }


    /* CRUD -> C (Create) */
    async createProducto(producto) {
        if(!ProductoModelMongoDB.conexionOk) return {}
        try {
            const productoSave = new ProductoModel(producto)
            await productoSave.save()
            
            let productos = await ProductoModel.find({})
            let productoGuardado = productos[productos.length-1]

            return productoGuardado
        }
        catch(error) {
            console.log(`Error en createProducto: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> R (Read ONE) */
    async readProducto(id) {
        if(!ProductoModelMongoDB.conexionOk) return {}
        try {
            let producto = await ProductoModel.findOne({_id:id})
            //console.log(producto)
            return producto
        }
        catch(error) {
            console.log(`Error en readProducto: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> R (Read ALL) */
    async readProductos(async) {
        if(!ProductoModelMongoDB.conexionOk) return []
        try {
            let productos = await ProductoModel.find({})
            //console.log(productos)
            return productos
        }
        catch(error) {
            console.log(`Error en readProductos: ${error.message}`)
            return []
        }
    }

    /* CRUD -> U (Update) */
    async updateProducto(id,producto) {
        if(!ProductoModelMongoDB.conexionOk) return {}
        try {
            await ProductoModel.updateOne({_id:id},{$set: producto})
            //console.log(producto)

            let productoActualizado = await ProductoModel.findOne({_id:id})
            //console.log(productoActualizado)
            return productoActualizado
        }
        catch(error) {
            console.log(`Error en updateProducto: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> D (Delete) */
    async deleteProducto(id) {
        if(!ProductoModelMongoDB.conexionOk) return {}
        try {
            
            let productoBorrado = await ProductoModel.findOne({_id:id})
            await ProductoModel.deleteOne({_id:id})
            //console.log(productoBorrado)
            return productoBorrado
        }
        catch(error) {
            console.log(`Error en deleteProducto: ${error.message}`)
            return {}
        }
    }
}

//exports
export default ProductoModelMongoDB