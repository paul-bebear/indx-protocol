import { useEffect, useState, useCallback } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { cn } from '../lib/utils';

interface CalButtonProps {
  calLink: string;
  className?: string;
  children: React.ReactNode;
  prefillData?: {
    name?: string;
    email?: string;
    notes?: string;
  };
}

export function CalButton({ calLink, className, children, prefillData }: CalButtonProps) {
  const [calLoaded, setCalLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      await getCalApi();
      setCalLoaded(true);
    })();
  }, []);

  const handleClick = useCallback(async () => {
    const cal = await getCalApi();
    
    // Build config only with defined values
    const config: Record<string, string> = {};
    if (prefillData?.name) config.name = prefillData.name;
    if (prefillData?.email) config.email = prefillData.email;
    if (prefillData?.notes) config.notes = prefillData.notes;
    
    cal('modal', {
      calLink,
      config: Object.keys(config).length > 0 ? config : undefined,
    });
  }, [calLink, prefillData]);

  return (
    <button onClick={handleClick} className={cn(className)} disabled={!calLoaded}>
      {children}
    </button>
  );
}
