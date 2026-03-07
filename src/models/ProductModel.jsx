export const ProductModel = (data = {}) => ({
    id: data._id || data.id || '',
    name: data.name || 'Sin nombre',
    description: data.description || 'Sin descripción',
    price: Number(data.price) || 0,
    stock: Number(data.stock) || 0,
    category: data.category || 'General',
    imageUrl: data.imageUrl || 'https://via.placeholder.com/150',
    createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '--',
    store: data.store || '',
    category: data.category || '',
});


export const initialProductState = {
    name: '',
    description: '',
    price: 0,
    cost: 0,
    stock: 0,
    category: '',
    store: '',
};