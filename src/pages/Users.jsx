import { MoreVertical, Edit2, Trash2, UserPlus } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn } from '../utils/cn';

const styles = {
    wrapper: "space-y-6",
    header: "flex justify-between items-center",
    title: "text-2xl font-bold text-gray-800",
    table: "w-full text-left border-collapse",
    thead: "bg-gray-50 border-b border-gray-200",
    th: "px-6 py-4 text-sm font-semibold text-gray-600",
    thRight: "px-6 py-4 text-sm font-semibold text-gray-600 text-right",
    tbody: "divide-y divide-gray-100",
    row: "hover:bg-gray-50 transition-colors",
    td: "px-6 py-4",
    nameList: "font-medium text-gray-900",
    emailList: "text-sm text-gray-500",
    roleText: "px-6 py-4 text-sm text-gray-600",
    statusCell: "px-6 py-4 text-sm",
    actionsCell: "px-6 py-4 text-right",
    editBtn: "text-gray-400 hover:text-blue-600 mr-3",
    delBtn: "text-gray-400 hover:text-red-600"
};

const Users = () => {
    const navigate = useNavigate();
    const { users, loading, error, refresh } = useUsers();
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>Gestión de Usuarios</h2>
                <Button onClick={() => navigate('/users/manage')}>
                    <UserPlus size={16} /> Nuevo Usuario
                </Button>
            </div>

            <Card noPadding>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.th}>Nombre</th>
                            <th className={styles.th}>Rol</th>
                            <th className={styles.th}>Estado</th>
                            <th className={styles.thRight}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {users.map((user) => (
                            <tr key={user.id} className={styles.row}>
                                <td className={styles.td}>
                                    <div className={styles.nameList}>{user.name}</div>
                                    <div className={styles.emailList}>{user.email}</div>
                                </td>
                                <td className={styles.roleText}>{user.role}</td>
                                <td className={styles.statusCell}>
                                    <Badge variant={user.status === 'Activo' ? 'success' : 'neutral'}>
                                        {user.status}
                                    </Badge>
                                </td>
                                <td className={styles.actionsCell}>
                                    <button
                                        className={styles.editBtn}
                                        onClick={() => navigate(`/users/manage/${user.id}`)}
                                        title="Editar usuario"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button className={styles.delBtn} title="Eliminar usuario"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default Users;