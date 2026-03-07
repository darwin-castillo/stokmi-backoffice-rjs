import { useState } from 'react';
import { X, Loader2, Save } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductModel, initialProductState } from '../models/ProductModel';

export const AddProductModal = ({ isOpen, onClose, onRefresh, store }) => {
    const [formData, setFormData] = useState(initialProductState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);


    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            formData.store = store;
            formData.category = 'Smartphones';
            await productService.create(formData);
            onRefresh(); // Refresca la lista de productos
            onClose();   // Cierra el modal
            setFormData(initialProductState); // Limpia el form
        } catch (err) {
            setError("Error al guardar el producto. Intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800">Añadir Producto</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={20} /></button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">{error}</p>}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Producto</label>
                        <input name="name" value={formData.name} onChange={handleChange} required
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Precio ($)</label>
                            <input name="price" type="number" value={formData.price} onChange={handleChange} required
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Stock Inicial</label>
                            <input name="stock" type="number" value={formData.stock} onChange={handleChange} required
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-3 font-semibold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSubmitting}
                            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-blue-300 transition-all shadow-lg shadow-blue-100">
                            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} /> Guardar</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

