import { useProducts } from '../hooks/useProducts'; // Importamos nuestro nuevo Hook
import { Package, Plus, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { ProductModel } from '../models/ProductModel';
import { AddProductModal } from '../components/AddProductModal';
import { useStores } from '../hooks/useStores';

const Products = () => {

    const { products, loading, error, refresh, isModalOpen, setIsModalOpen } = useProducts();
    const { stores, loadingStores, errorStores } = useStores();
    console.log(stores.length > 0 ? "La tienda es " + stores[0].name : "No hay tiendas registradas");

    if (loading) return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    if (error) return (
        <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-100">
            <AlertCircle className="mx-auto text-red-500 mb-2" />
            <p className="text-red-700 font-medium">{error}</p>
            <button onClick={refresh} className="mt-4 text-sm text-red-600 underline">Reintentar</button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Productos</h2>
                <div className="flex gap-2">
                    <button onClick={refresh} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <RefreshCw size={20} />
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)} // ABRIR MODAL
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
                    >
                        <Plus size={20} /> Nuevo Producto
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold">{product.name}</h3>
                        <p className="text-blue-600 font-black mt-2">${product.price}</p>
                    </div>
                ))}
            </div>
            {stores.length > 0 ? (
                <AddProductModal
                    store={stores[0]._id}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onRefresh={refresh}
                />
            ) :
                <p className="text-center text-gray-600">No hay tiendas registradas</p>
            }
        </div>

    );
};
//OLED LTPO de 6.8 pulgadas 12 GB o 16 GB de RAM Bateria capacidad de 5,850 mAh

export default Products;
