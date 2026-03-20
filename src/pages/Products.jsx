import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Package, Plus, Loader2, AlertCircle, RefreshCw, LayoutGrid, List, Pencil } from 'lucide-react';
import { useStores } from '../hooks/useStores';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../hooks/useGlobal';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { cn } from '../utils/cn';

const styles = {
    loader: "h-96 flex items-center justify-center",
    alertWrapper: "p-8 text-center bg-red-50 rounded-2xl border border-red-100",
    alertIcon: "mx-auto text-red-500 mb-2",
    alertText: "text-red-700 font-medium",
    alertBtn: "mt-4 text-sm text-red-600 underline",
    wrapper: "space-y-6",
    header: "flex justify-between items-center",
    title: "text-2xl font-bold text-gray-800",
    controls: "flex gap-2 items-center",
    refreshBtn: "p-2 text-gray-400 hover:text-blue-600 transition-colors",
    viewToggleGroup: "flex bg-gray-100 rounded-lg p-1",
    viewBtn: "p-1.5 rounded-md transition-all",
    viewBtnActive: "bg-white shadow-sm text-blue-600",
    viewBtnInactive: "text-gray-500 hover:text-gray-700",
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
    productCard: "bg-white p-5 rounded-2xl shadow-sm border border-gray-100 font-bold",
    cardTop: "flex justify-between items-start",
    cardTitle: "font-bold text-gray-800",
    editBtn: "p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
    priceText: "text-blue-600 font-black mt-2",
    table: "w-full text-left border-collapse",
    th: "p-4 font-semibold text-gray-600",
    tableRow: "border-b border-gray-50 hover:bg-gray-50 transition-colors",
    td: "p-4 font-medium text-gray-800",
    tdPrice: "p-4 text-blue-600 font-bold",
    tdActions: "p-4 flex gap-2 justify-end",
    stockBadge: "text-white  bg-red-600 px-2 py-0.5 rounded-md text-xs"
};

const Products = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid');
    const { products, loading, error, refresh } = useProducts();
    const { stores, loadingStores, errorStores } = useStores();
    const { selectedRoute, selectRoute } = useGlobal("products");



    console.log(stores.length > 0 ? "La tienda es " + stores[0].name : "No hay tiendas registradas");

    if (loading) return (
        <div className={styles.loader}>
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    if (error) return (
        <div className={styles.alertWrapper}>
            <AlertCircle className={styles.alertIcon} />
            <p className={styles.alertText}>{error}</p>
            <button onClick={refresh} className={styles.alertBtn}>Reintentar</button>
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>Productos</h2>
                <div className={styles.controls}>
                    <button onClick={refresh} title="Actualizar" className={styles.refreshBtn}>
                        <RefreshCw size={20} />
                    </button>
                    <div className={styles.viewToggleGroup}>
                        <button
                            onClick={() => setViewMode('grid')}
                            title="Vista de cuadrícula"
                            className={cn(styles.viewBtn, viewMode === 'grid' ? styles.viewBtnActive : styles.viewBtnInactive)}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            title="Vista de tabla"
                            className={cn(styles.viewBtn, viewMode === 'table' ? styles.viewBtnActive : styles.viewBtnInactive)}
                        >
                            <List size={18} />
                        </button>
                    </div>
                    <Button onClick={() => navigate('/products/manage')}>
                        <Plus size={20} /> Nuevo Producto
                    </Button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className={styles.grid}>
                    {products.map(product => (
                        <div key={product._id} className={styles.productCard}>
                            <div className={styles.cardTop}>
                                <h3 className={styles.cardTitle}>{product.name}</h3>
                                <button
                                    onClick={() => navigate(`/products/manage/${product._id}`)}
                                    className={styles.editBtn}
                                    title="Editar producto"
                                >
                                    <Pencil size={16} />
                                </button>
                            </div>
                            <p className={styles.priceText}>${product.price}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <Card noPadding>
                    <table className={styles.table}>
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-sm">
                                <th className={styles.th}>Nombre</th>
                                <th className={styles.th}>Precio</th>
                                <th className={styles.th}>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} className={styles.tableRow}>
                                    <td className={styles.td}>{product.name}</td>
                                    <td className={styles.tdPrice}>${product.price}</td>
                                    <td className={styles.td}>{product.stock <= 0 ? <span className={styles.stockBadge}>Agotado</span> : product.stock}</td>
                                    <td className={styles.tdActions}>
                                        <button
                                            onClick={() => navigate(`/products/manage/${product._id}`)}
                                            className={styles.editBtn}
                                            title="Editar producto"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            )}


        </div>

    );
};


export default Products;
