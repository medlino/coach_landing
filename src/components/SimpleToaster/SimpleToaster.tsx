'use client';

import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

export function SimpleToaster() {
  return (
    <Suspense>
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Suspense>
  );
}
