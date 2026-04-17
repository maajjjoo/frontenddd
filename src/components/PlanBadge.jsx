import { useUser } from '../context/UserContext';

const STYLES = {
  FREE:       'bg-pastel-lavender text-purple-600 border border-pastel-purple',
  PRO:        'bg-pastel-sky text-blue-600 border border-blue-200',
  ENTERPRISE: 'bg-pastel-peach text-orange-600 border border-orange-200',
};

const ICONS = { FREE: '⚡', PRO: '🚀', ENTERPRISE: '👑' };

export default function PlanBadge() {
  const { activeUser } = useUser();
  const plan = activeUser.plan;
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 ${STYLES[plan] ?? STYLES.FREE}`}>
      <span>{ICONS[plan]}</span>
      {plan}
    </span>
  );
}
