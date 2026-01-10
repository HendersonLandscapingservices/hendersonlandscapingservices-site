import { Link } from "react-router-dom";
import Container from "../components/Container";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" description="Sorry, this page could not be found." path="/404" noIndex />
      <Container className="py-14">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Page not found</h1>
          <p className="mt-2 text-sm text-slate-600">
            The page you are looking for doesn&apos;t exist or has moved.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
            >
              Go to Home
            </Link>
            <Link
              to="/enquiry"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-white"
            >
              Send an enquiry
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
