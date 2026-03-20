import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { cn } from '../utils/cn';

const styles = {
    wrapper: "min-h-screen bg-slate-50 flex items-center justify-center p-4",
    card: "max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100",
    header: "text-center mb-10",
    iconBox: "inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4 shadow-lg shadow-blue-200",
    title: "text-3xl font-bold text-gray-900",
    subtitle: "text-gray-500 mt-2",
    form: "space-y-6",
    errorAlert: "bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm border border-red-100",
    label: "block text-sm font-semibold text-gray-700 mb-2",
    inputWrapper: "relative",
    inputIcon: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
    inputPl: "pl-10",
    pwdInputPl: "pl-10 pr-12",
    pwdBtn: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors",
    footerRow: "flex items-center justify-between text-sm",
    checkboxLabel: "flex items-center gap-2 cursor-pointer text-gray-600",
    checkbox: "rounded border-gray-300 text-blue-600 focus:ring-blue-500",
    linkText: "text-blue-600 font-semibold hover:underline",
    btnLabel: "w-full py-3",
    bottomText: "text-center text-gray-500 text-sm mt-8"
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
            setIsSubmitting(false); // Reactivar el botón si falla
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                {/* Logo / Header */}
                <div className={styles.header}>
                    <div className={styles.iconBox}>
                        <Lock className="text-white" size={32} />
                    </div>
                    <h1 className={styles.title}>Bienvenido</h1>
                    <p className={styles.subtitle}>Ingresa tus credenciales para acceder</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {error && (
                        <div className={styles.errorAlert}>
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}
                    <div>
                        <label className={styles.label}>Email</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.inputIcon} size={20} />
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="admin@ejemplo.com"
                                className={styles.inputPl}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className={styles.label}>Contraseña</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} size={20} />
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className={styles.pwdInputPl}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={styles.pwdBtn}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.footerRow}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            Recordarme
                        </label>
                        <a href="#" className={styles.linkText}>¿Olvidaste tu contraseña?</a>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.btnLabel}
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </Button>
                </form>

                <p className={styles.bottomText}>
                    ¿No tienes una cuenta? <a href="#" className={styles.linkText}>Contacta al admin</a>
                </p>
            </div>
        </div>
    );
};

export default Login;