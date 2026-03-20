import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { cn } from '../utils/cn';

const styles = {
    wrapper: "space-y-8",
    kpiGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
    chartsGrid: "grid grid-cols-1 lg:grid-cols-3 gap-8",
    chartArea: "lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm",
    chartTitle: "text-lg font-bold text-gray-800 mb-4",
    chartWrapper: "h-80 w-full",
    chartPie: "bg-white p-6 rounded-2xl border border-gray-100 shadow-sm",
    statCard: "bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between",
    statTitle: "text-sm font-medium text-gray-500",
    statValue: "text-2xl font-bold text-gray-800 mt-1",
    statTrendBase: "text-xs font-bold mt-2 inline-block",
    statTrendUp: "text-green-500",
    statTrendDown: "text-red-500",
    statIconWrapper: "p-3 bg-gray-50 rounded-xl"
};

// Datos de ejemplo para la gráfica de línea
const dataSales = [
    { name: 'Ene', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Abr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
];

// Datos de ejemplo para la gráfica circular
const dataPie = [
    { name: 'Directo', value: 400 },
    { name: 'Social', value: 300 },
    { name: 'Email', value: 300 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

const Dashboard = () => {
    return (
        <div className={styles.wrapper}>
            {/* 1. SECCIÓN DE TARJETAS (KPIs) */}
            <div className={styles.kpiGrid}>
                <StatCard title="Ingresos" value="$12,450" icon={<DollarSign className="text-blue-600" />} trend="+12%" />
                <StatCard title="Usuarios" value="1,240" icon={<Users className="text-emerald-600" />} trend="+5%" />
                <StatCard title="Pedidos" value="456" icon={<ShoppingCart className="text-amber-600" />} trend="-2%" />
                <StatCard title="Crecimiento" value="18.2%" icon={<TrendingUp className="text-purple-600" />} trend="+3%" />
            </div>

            {/* 2. SECCIÓN DE GRÁFICAS */}
            <div className={styles.chartsGrid}>

                {/* Gráfica de Área (Ocupa 2 columnas) */}
                <div className={styles.chartArea}>
                    <h3 className={styles.chartTitle}>Tendencia de Ventas</h3>
                    <div className={styles.chartWrapper}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dataSales}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Gráfica Circular (Ocupa 1 columna) */}
                <div className={styles.chartPie}>
                    <h3 className={styles.chartTitle}>Fuentes de Tráfico</h3>
                    <div className={styles.chartWrapper}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={dataPie} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {dataPie.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Componente Interno para las Tarjetas
const StatCard = ({ title, value, icon, trend }) => (
    <div className={styles.statCard}>
        <div>
            <p className={styles.statTitle}>{title}</p>
            <h3 className={styles.statValue}>{value}</h3>
            <span className={cn(styles.statTrendBase, trend.startsWith('+') ? styles.statTrendUp : styles.statTrendDown)}>
                {trend} vs mes pasado
            </span>
        </div>
        <div className={styles.statIconWrapper}>
            {icon}
        </div>
    </div>
);

export default Dashboard;