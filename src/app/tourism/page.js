'use client';
import { Suspense } from 'react';
import TourismPage from './tourismPage';

export default function TourismPageComponent() {
  return (
    <Suspense fallback={null}>
      <TourismPage />
    </Suspense>
  );
}
