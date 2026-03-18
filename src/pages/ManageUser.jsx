import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../services/userService';
import { initialUserState } from '../models/UserModel';
import { ChevronLeft, Save, Loader2, UserPlus } from 'lucide-react';

const ManageUser = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    const [formData, setFormData] = useState({ ...initialUserState, passwordConfirm: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(isEditMode);
    const [error, setError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await userService.getById(id);
            const user = response.value || response; // Just in case data is wrapped
            setFormData({ ...user, password: '', passwordConfirm: '' });
        } catch (err) {
            setError("Error al cargar el usuario. Por favor intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    const validatePassword = (password) => {
        if (isEditMode && !password) return null;
        if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres";
        if (!/[A-Z]/.test(password)) return "La contraseña debe contener al menos una letra mayúscula";
        if (!/[0-9]/.test(password)) return "La contraseña debe contener al menos un número";
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'password' || name === 'passwordConfirm') {
            setPasswordError(null); // Clear error when user types
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setPasswordError(null);

        if (!isEditMode || formData.password) {
            const pError = validatePassword(formData.password);
            if (pError) {
                setPasswordError(pError);
                setIsSubmitting(false);
                return;
            }

            if (formData.password !== formData.passwordConfirm) {
                setPasswordError("Las contraseñas no coinciden");
                setIsSubmitting(false);
                return;
            }
        }

        try {
            const submitData = { ...formData };
            if (isEditMode && !submitData.password) {
                delete submitData.password;
                delete submitData.passwordConfirm;
            }

            if (isEditMode) {
                await userService.update(id, submitData);
            } else {
                await userService.create(submitData);
            }
            navigate('/users');
        } catch (err) {
            setError("Error al conectar con la API. Revisa los datos.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
                <ChevronLeft size={20} /> Volver a usuarios
            </button>

            <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-2xl text-white">
                    <UserPlus size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{isEditMode ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h1>
                    <p className="text-gray-500">{isEditMode ? 'Actualiza la información del usuario en el sistema.' : 'Completa la información para registrar el usuario en el sistema.'}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
                            <span className="font-bold">!</span> {error}
                        </div>
                    )}

                    {/* Basic Info Panel */}
                    <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Información Básica</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ej: Juan Pérez"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="correo@ejemplo.com"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Rol del Usuario</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value="admin">Administrador</option>
                                    <option value="editor">Editor</option>
                                    <option value="viewer">Lector (Viewer)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Security Panel */}
                    <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Seguridad</h2>

                        {passwordError && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 flex items-center gap-2 text-sm">
                                <span className="font-bold">!</span> {passwordError}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña {isEditMode && "(Opcional)"}</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder={isEditMode ? "Dejar en blanco para mantener actual" : "••••••••"}
                                    required={!isEditMode}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-2">Mínimo 6 caracteres, 1 mayúscula y 1 número.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Confirmar Contraseña {isEditMode && "(Opcional)"}</label>
                                <input
                                    name="passwordConfirm"
                                    type="password"
                                    value={formData.passwordConfirm}
                                    onChange={handleChange}
                                    placeholder={isEditMode ? "Dejar en blanco para mantener actual" : "••••••••"}
                                    required={!isEditMode}
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 outline-none transition-all ${formData.passwordConfirm && formData.password !== formData.passwordConfirm
                                        ? 'border-red-300 focus:ring-red-500'
                                        : 'border-gray-200 focus:ring-blue-500'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-8 flex justify-end gap-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => navigate('/users')}
                        className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-200 rounded-xl transition-all"
                    >
                        Descartar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all disabled:bg-blue-300"
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <><Save size={20} /> {isEditMode ? 'Actualizar Usuario' : 'Registrar Usuario'}</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManageUser;
