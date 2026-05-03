export function Footer() {
  return (
    <footer className="bg-foreground text-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Digital Humanities BeNeLux. All
          rights reserved.
        </p>
        <p className="mt-2">
          <span className="mx-2">|</span>
          <a
            href="mailto:info@dhbenelux.org"
            className="hover:text-background hover:underline"
          >
            Contact
          </a>
        </p>
      </div>
    </footer>
  );
}
