'use client';

import useActiveChannel from '../_hooks/useActiveChannel';

function ActiveStatus() {
  useActiveChannel();

  return null;
}

export default ActiveStatus;
