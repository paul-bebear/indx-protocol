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
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async function () {
      try {
        await getCalApi();
        if (mounted) setCalLoaded(true);
      } catch (err) {
        console.error('Cal.com failed to load:', err);
        if (mounted) setLoadError(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleClick = useCallback(async () => {
    try {
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
    } catch (err) {
      console.error('Failed to open Cal.com modal:', err);
      // Fallback: open in new tab
      window.open(`https://cal.com/${calLink}`, '_blank');
    }
  }, [calLink, prefillData]);

  // If Cal.com failed to load, show a fallback link
  if (loadError) {
    return (
      <a 
        href={`https://cal.com/${calLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className)}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={handleClick} 
      className={cn(className)} 
      disabled={!calLoaded}
      type="button"
    >
      {!calLoaded ? 'Loading...' : children}
    </button>
  );
}
