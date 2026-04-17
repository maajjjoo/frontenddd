import { useUser } from '../context/UserContext';

const STYLES = {
  FREE:       'bg-gray-500/20 text-gray-300 border border-gray-500/30',
  PRO:        'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  ENTERPRISE: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
};

const ICONS = { FREE: '⚡', PRO: '🚀', ENTERPRISE: '👑' };

export default function PlanBadge() {
  const { activeUser } = useUser();
  const plan = activeUser.plan;
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1 ${STYLES[plan] ?? STYLES.FREE}`}>
      <span>{ICONS[plan]}</span>
      {plan}
    </span>
  );
}
