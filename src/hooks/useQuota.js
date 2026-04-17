import { useEffect, useCallback } from 'react';
import { getQuotaStatus } from '../api/api';
import { useUser } from '../context/UserContext';

export function useQuota() {
  const { activeUser, setQuota } = useUser();

  const refresh = useCallback(async () => {
    try {
      const status = await getQuotaStatus(activeUser.id);
      setQuota(status);
    } catch (err) {
      console.error('Failed to refresh quota', err);
    }
  }, [activeUser.id, setQuota]);

  useEffect(() => { refresh(); }, [refresh]);

  return { refresh };
}
