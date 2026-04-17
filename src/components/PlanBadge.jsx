import { useUser } from '../context/UserContext';

const STYLES = {
  FREE:       'bg-gray-100 text-gray-700',
  PRO:        'bg-blue-100 text-blue-700',
  ENTERPRISE: 'bg-purple-100 text-purple-700',
};

export default function PlanBadge() {
  const { activeUser } = useUser();
  const plan = activeUser.plan;
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STYLES[plan] ?? STYLES.FREE}`}>
      {plan}
    </span>
  );
}
