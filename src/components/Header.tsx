
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Droplet } from "lucide-react";
import { Link } from "react-router-dom";

// Mock user data for demonstration - in a real app, this would come from auth
const mockUser = {
  isAdmin: true, // Set to true to test admin features
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplet size={30} className="text-sangue-600" />
          <Link to="/" className="text-xl font-bold text-sangue-700">SangueVital</Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-sangue-600 transition-colors">Home</Link>
          <Link to="/sobre" className="text-sm font-medium hover:text-sangue-600 transition-colors">Sobre</Link>
          <Link to="/campanhas" className="text-sm font-medium hover:text-sangue-600 transition-colors">Campanhas</Link>
          <Link to="/locais" className="text-sm font-medium hover:text-sangue-600 transition-colors">Locais de Doação</Link>
          <Link to="/contato" className="text-sm font-medium hover:text-sangue-600 transition-colors">Contato</Link>
          {mockUser.isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-sangue-600 hover:text-sangue-700 transition-colors">
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex">Entrar</Button>
          <Button className="hidden sm:flex bg-sangue-600 hover:bg-sangue-700">Cadastrar</Button>
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium hover:text-sangue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/sobre" className="text-sm font-medium hover:text-sangue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Sobre</Link>
            <Link to="/campanhas" className="text-sm font-medium hover:text-sangue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Campanhas</Link>
            <Link to="/locais" className="text-sm font-medium hover:text-sangue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Locais de Doação</Link>
            <Link to="/contato" className="text-sm font-medium hover:text-sangue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Contato</Link>
            {mockUser.isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-sangue-600 hover:text-sangue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
            )}
            <div className="flex flex-col sm:hidden space-y-2 pt-2">
              <Button variant="outline" className="w-full">Entrar</Button>
              <Button className="w-full bg-sangue-600 hover:bg-sangue-700">Cadastrar</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
