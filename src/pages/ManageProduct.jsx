import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { initialProductState } from '../models/ProductModel';
import { ChevronLeft, Save, Loader2, Package } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { cn } from '../utils/cn';

const styles = {
    loaderWrapper: "flex justify-center items-center h-64",
    loaderIcon: "animate-spin text-blue-600",
    wrapper: "max-w-3xl mx-auto space-y-6",
    backBtn: "flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors",
    headerGroup: "flex items-center gap-3",
    iconBox: "p-3 bg-blue-600 rounded-2xl text-white",
    title: "text-3xl font-bold text-gray-900",
    subtitle: "text-gray-500",
    formInner: "p-8 space-y-6",
    errorAlert: "bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2",
    gridLayout: "grid grid-cols-1 gap-6",
    label: "block text-sm font-bold text-gray-700 mb-2",
    rowGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
    textarea: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none",
    footer: "bg-gray-50 p-8 flex justify-end gap-4 border-t border-gray-100",
    discardBtn: "px-6 py-3 font-bold text-gray-500 hover:bg-gray-200 rounded-xl transition-all"
}; const ManageProduct = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    const [formData, setFormData] = useState(initialProductState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(isEditMode);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await productService.getById(id);
            const product = response.value || response;
            setFormData({
                name: product.name || '',
                price: product.price || 0,
                stock: product.stock || 0,
                description: product.description || ''
            });
        } catch (err) {
            setError("Error al cargar el producto. Por favor intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            if (isEditMode) {
                await productService.update(id, formData);
            } else {
                await productService.create(formData);
            }
            // Navegamos de vuelta a la lista de productos tras el éxito
            navigate('/products');
        } catch (err) {
            setError("Error al conectar con la API. Revisa los datos.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loaderWrapper}>
                <Loader2 className={styles.loaderIcon} size={40} />
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            {/* Cabecera / Breadcrumbs */}
            <button
                onClick={() => navigate('/products')}
                className={styles.backBtn}
            >
                <ChevronLeft size={20} /> Volver al inventario
            </button>

            <div className={styles.headerGroup}>
                <div className={styles.iconBox}>
                    <Package size={28} />
                </div>
                <div>
                    <h1 className={styles.title}>{isEditMode ? 'Editar Producto' : 'Crear Nuevo Producto'}</h1>
                    <p className={styles.subtitle}>{isEditMode ? 'Actualiza la información del producto.' : 'Completa la información para registrar el artículo en el sistema.'}</p>
                </div>
            </div>

            <Card noPadding as="form" onSubmit={handleSubmit}>
                <div className={styles.formInner}>
                    {error && (
                        <div className={styles.errorAlert}>
                            <span className="font-bold">!</span> {error}
                        </div>
                    )}

                    <div className={styles.gridLayout}>
                        {/* Nombre */}
                        <div>
                            <label className={styles.label}>Nombre del Producto</label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ej: Laptop Pro 14"
                                required
                            />
                        </div>

                        {/* Fila: Precio y Stock */}
                        <div className={styles.rowGrid}>
                            <div>
                                <label className={styles.label}>Precio de Venta ($)</label>
                                <Input
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                            <div>
                                <label className={styles.label}>Stock Inicial</label>
                                <Input
                                    name="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="Cantidad en almacén"
                                    required
                                />
                            </div>
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className={styles.label}>Descripción del Producto</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Escribe los detalles técnicos o comerciales..."
                                className={styles.textarea}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer del Formulario */}
                <div className={styles.footer}>
                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className={styles.discardBtn}
                    >
                        Descartar
                    </button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <><Save size={20} /> {isEditMode ? 'Actualizar Producto' : 'Registrar Producto'}</>
                        )}
                    </Button>
                </div>
            </Card>
        </div>
    );
};
export default ManageProduct;