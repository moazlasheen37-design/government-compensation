import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home';

// Inner pages are code-split; the homepage ships in the main bundle for fastest first paint.
const AboutPage = lazy(() => import('../pages/About'));
const CompensationProceduresPage = lazy(() => import('../pages/CompensationProcedures'));
const CoverageCasesPage = lazy(() => import('../pages/CoverageCases'));
const LawsPage = lazy(() => import('../pages/LawsAndRegulations'));
const BoardPage = lazy(() => import('../pages/BoardOfDirectors'));
const NewsPage = lazy(() => import('../pages/News'));
const NewsDetailsPage = lazy(() => import('../pages/NewsDetails'));
const ComplaintsPage = lazy(() => import('../pages/Complaints'));
const ContactPage = lazy(() => import('../pages/Contact'));
const FAQPage = lazy(() => import('../pages/FAQ'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const page = (Cmp) => (
  <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
    <Cmp />
  </Suspense>
);

export const ROUTES = [
  { index: true, element: <HomePage /> },
  { path: 'about', element: page(AboutPage) },
  { path: 'compensation-procedures', element: page(CompensationProceduresPage) },
  { path: 'coverage-cases', element: page(CoverageCasesPage) },
  { path: 'laws-and-regulations', element: page(LawsPage) },
  { path: 'board-of-directors', element: page(BoardPage) },
  { path: 'news', element: page(NewsPage) },
  { path: 'news/:slug', element: page(NewsDetailsPage) },
  { path: 'complaints', element: page(ComplaintsPage) },
  // The standalone Forms & Documents page was merged into Compensation Procedures.
  { path: 'forms-documents', element: <Navigate to="/compensation-procedures#documents" replace /> },
  { path: 'contact', element: page(ContactPage) },
  { path: 'faq', element: page(FAQPage) },
  { path: '*', element: page(NotFoundPage) },
];

export const router = createBrowserRouter([{ path: '/', element: <MainLayout />, children: ROUTES }]);
