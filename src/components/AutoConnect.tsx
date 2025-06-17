'use client';

import { useEffect } from 'react';
import { useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function AutoReconnect() {
  const { connect } = useConnect();

  useEffect(() => {
    connect({ connector: injected() });
  }, []);

  return null;
}
