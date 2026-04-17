import { useUser } from '../context/UserContext';

const STYLES = {
  FREE:       'bg-gray-100 text-gray-600 border border-gray-200',
  PRO:        'bg-indigo-50 text-indigo-700 border border-indigo-100',
  ENTERPRISE: 'bg-amber-50 text-amber-700 border border-amber-100',
};
const ICONS = { FREE: '⚡', PRO: '🚀', ENTERPRISE: '👑' };

export default function PlanBadge() {
  const { activeUser } = useUser();
  const plan = activeUser.plan;
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 ${STYLES[plan] ?? STYLES.FREE}`}>
      {ICONS[plan]} {plan}
    </span>
  );
}
