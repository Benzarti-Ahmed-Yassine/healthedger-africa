const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto py-8 text-sm text-muted-foreground flex items-center justify-between">
        <p>© {new Date().getFullYear()} Hedera Santé Afrique</p>
        <nav className="flex gap-6">
          <a href="#features" className="hover:text-foreground">Fonctionnalités</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
          <a href="https://docs.hedera.com/" target="_blank" rel="noreferrer" className="hover:text-foreground">Docs Hedera</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
