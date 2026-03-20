import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../services/userService';
import { initialUserState } from '../models/UserModel';
import { ChevronLeft, Save, Loader2, UserPlus, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

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
    pErrorAlert: "bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 flex items-center gap-2 text-sm",
    panelInfo: "border border-gray-100 rounded-2xl p-6 bg-white shadow-sm space-y-6",
    panelTitle: "text-lg font-bold text-gray-800 border-b border-gray-100 pb-2",
    grid2: "grid grid-cols-1 md:grid-cols-2 gap-6",
    label: "block text-sm font-bold text-gray-700 mb-2",
    selectFull: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all",
    pwdHint: "text-xs text-gray-500 mt-2",
    footer: "bg-gray-50 p-8 flex justify-end gap-4 border-t border-gray-100",
    discardBtn: "px-6 py-3 font-bold text-gray-500 hover:bg-gray-200 rounded-xl transition-all"
};const ManageUser = () => {
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
            <div className={styles.loaderWrapper}>
                <Loader2 className={styles.loaderIcon} size={40} />
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <button
                onClick={() => navigate(-1)}
                className={styles.backBtn}
            >
                <ChevronLeft size={20} /> Volver a usuarios
            </button>

            <div className={styles.headerGroup}>
                <div className={styles.iconBox}>
                    <UserPlus size={28} />
                </div>
                <div>
                    <h1 className={styles.title}>{isEditMode ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h1>
                    <p className={styles.subtitle}>{isEditMode ? 'Actualiza la información del usuario en el sistema.' : 'Completa la información para registrar el usuario en el sistema.'}</p>
                </div>
            </div>

            <Card noPadding as="form" onSubmit={handleSubmit}>
                <div className={styles.formInner}>
                    {error && (
                        <div className={styles.errorAlert}>
                            <AlertCircle size={20} /> {error}
                        </div>
                    )}

                    {/* Basic Info Panel */}
                    <div className={styles.panelInfo}>
                        <h2 className={styles.panelTitle}>Información Básica</h2>
                        <div className={styles.grid2}>
                            <div>
                                <label className={styles.label}>Nombre Completo</label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ej: Juan Pérez"
                                    required
                                />
                            </div>
                            <div>
                                <label className={styles.label}>Correo Electrónico</label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="correo@ejemplo.com"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className={styles.label}>Rol del Usuario</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className={styles.selectFull}
                                >
                                    <option value="admin">Administrador</option>
                                    <option value="editor">Editor</option>
                                    <option value="viewer">Lector (Viewer)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Security Panel */}
                    <div className={styles.panelInfo}>
                        <h2 className={styles.panelTitle}>Seguridad</h2>

                        {passwordError && (
                            <div className={styles.pErrorAlert}>
                                <AlertCircle size={18} /> {passwordError}
                            </div>
                        )}

                        <div className={styles.grid2}>
                            <div>
                                <label className={styles.label}>Contraseña {isEditMode && "(Opcional)"}</label>
                                <Input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder={isEditMode ? "Dejar en blanco para mantener actual" : "••••••••"}
                                    required={!isEditMode}
                                />
                                <p className={styles.pwdHint}>Mínimo 6 caracteres, 1 mayúscula y 1 número.</p>
                            </div>
                            <div>
                                <label className={styles.label}>Confirmar Contraseña {isEditMode && "(Opcional)"}</label>
                                <Input
                                    name="passwordConfirm"
                                    type="password"
                                    value={formData.passwordConfirm}
                                    onChange={handleChange}
                                    placeholder={isEditMode ? "Dejar en blanco para mantener actual" : "••••••••"}
                                    required={!isEditMode}
                                    hasError={formData.passwordConfirm && formData.password !== formData.passwordConfirm}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <button
                        type="button"
                        onClick={() => navigate('/users')}
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
                            <><Save size={20} /> {isEditMode ? 'Actualizar Usuario' : 'Registrar Usuario'}</>
                        )}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ManageUser;
