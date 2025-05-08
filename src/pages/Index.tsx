
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BloodTypeCard from "@/components/BloodTypeCard";
import DonationInfo from "@/components/DonationInfo";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const bloodTypeInventory = [
    { type: "A+", level: 45, critical: false },
    { type: "A-", level: 30, critical: true },
    { type: "B+", level: 60, critical: false },
    { type: "B-", level: 25, critical: true },
    { type: "AB+", level: 80, critical: false },
    { type: "AB-", level: 15, critical: true },
    { type: "O+", level: 50, critical: false },
    { type: "O-", level: 20, critical: true },
  ];

  const featuredCampaigns = [
    {
      id: 1,
      title: "Campanha para o Hospital São Lucas",
      description: "Precisamos urgentemente de doadores para atender pacientes da ala de oncologia.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      bloodType: "O-",
      progress: 45,
      goal: 100,
      daysLeft: 15
    },
    {
      id: 2,
      title: "Doação para Maria Silva",
      description: "Maria precisa de transfusão urgente após acidente. Ajude-nos a encontrar doadores compatíveis.",
      image: "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bloodType: "A-",
      progress: 12,
      goal: 30,
      daysLeft: 5
    },
    {
      id: 3,
      title: "Hemocentro Regional - Estoque Crítico",
      description: "Nosso banco de sangue está com níveis críticos para alguns tipos sanguíneos.",
      image: "https://images.unsplash.com/photo-1615461065929-4f2e0e407b14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bloodType: "Todos",
      progress: 150,
      goal: 300,
      daysLeft: 30
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        
        {/* Blood Inventory Section */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Níveis de Estoque</h2>
              <p className="text-muted-foreground md:text-lg max-w-3xl">
                Confira os níveis atuais de estoque de sangue em nossos bancos. Os tipos marcados estão em estado crítico e precisam de doação urgente.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {bloodTypeInventory.map((blood) => (
                <BloodTypeCard 
                  key={blood.type}
                  type={blood.type}
                  level={blood.level}
                  critical={blood.critical}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Donation Info Section */}
        <DonationInfo />
        
        {/* Featured Campaigns Section */}
        <section className="w-full py-12 md:py-16 bg-gray-50 blood-drop-bg">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Campanhas em Destaque</h2>
              <p className="text-muted-foreground md:text-lg max-w-3xl">
                Conheça as campanhas de doação de sangue que estão acontecendo agora. Sua participação pode fazer toda a diferença.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCampaigns.map((campaign) => (
                <CampaignCard 
                  key={campaign.id}
                  title={campaign.title}
                  image={campaign.image}
                  description={campaign.description}
                  bloodType={campaign.bloodType}
                  progress={campaign.progress}
                  goal={campaign.goal}
                  daysLeft={campaign.daysLeft}
                />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button className="bg-sangue-600 hover:bg-sangue-700">
                Ver todas as campanhas
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-sangue-600 to-sangue-700 text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Pronto para Salvar Vidas?</h2>
            <p className="md:text-lg mb-8 max-w-2xl mx-auto">
              Uma única doação pode ajudar até três pessoas diferentes. Junte-se a milhares de doadores e faça a diferença hoje mesmo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-sangue-700 hover:bg-gray-100 rounded-full px-8 py-6">
                Quero Doar
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-sangue-500 rounded-full px-8 py-6">
                Criar Campanha
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-gray-900 text-gray-300">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sangue-500">
                  <path d="M10 12c0 2.1-1.7 3.9-3.8 4l-.6-.5C7.1 14.2 8 13.2 8 12s-.9-2.2-2.4-3.5l.6-.5c2.1 0 3.8 1.9 3.8 4Z"></path>
                  <path d="M13.1 12c0 2.1 1.7 3.9 3.8 4l.6-.5c-1.5-1.3-2.4-2.3-2.4-3.5s.9-2.2 2.4-3.5l-.6-.5c-2.1 0-3.8 1.9-3.8 4Z"></path>
                  <circle cx="12" cy="12" r="1"></circle>
                  <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10Z"></path>
                </svg>
                <span className="text-lg font-bold">SangueVital</span>
              </div>
              <p className="text-sm text-gray-400">
                SangueVital é uma plataforma dedicada a conectar doadores de sangue com pessoas e instituições que necessitam de doações.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Campanhas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Locais de Doação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Contato</h3>
              <address className="text-sm text-gray-400 not-italic">
                <p>Rua das Acácias, 123</p>
                <p>São Paulo, SP</p>
                <p>CEP: 01000-000</p>
                <p className="mt-2">contato@sanguevital.com.br</p>
                <p>(11) 99999-9999</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center text-gray-400">
            <p>© {new Date().getFullYear()} SangueVital. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
