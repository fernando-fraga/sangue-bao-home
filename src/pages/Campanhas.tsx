
import React from "react";
import Header from "@/components/Header";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Mock data for campaigns
const campaignsMock = [
  {
    id: 1,
    title: "Campanha Emergencial Hospital Santa Maria",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61939c4?q=80&w=1000&auto=format&fit=crop",
    description: "Estoque crítico de sangue do tipo O- para pacientes em tratamento oncológico.",
    bloodType: "O-",
    progress: 45,
    goal: 100,
    daysLeft: 7
  },
  {
    id: 2,
    title: "Doe Sangue para Maria Clara",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1000&auto=format&fit=crop",
    description: "Maria Clara, 8 anos, precisa de doações de sangue para seu tratamento de leucemia.",
    bloodType: "A+",
    progress: 28,
    goal: 50,
    daysLeft: 14
  },
  {
    id: 3,
    title: "Campanha Universitária de Doação",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop",
    description: "Estudantes universitários se mobilizam para aumentar os estoques do hemocentro regional.",
    bloodType: "Todos",
    progress: 120,
    goal: 200,
    daysLeft: 21
  },
  {
    id: 4,
    title: "Doação para Cirurgias Cardíacas",
    image: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?q=80&w=1000&auto=format&fit=crop",
    description: "Hospital Regional necessita de doações para pacientes que realizarão cirurgias cardíacas.",
    bloodType: "B+",
    progress: 67,
    goal: 80,
    daysLeft: 5
  },
  {
    id: 5,
    title: "Campanha Empresarial Tech Blood",
    image: "https://images.unsplash.com/photo-1631815588090-d1bcbe9a8545?q=80&w=1000&auto=format&fit=crop",
    description: "Empresas de tecnologia se unem para incentivar a doação entre seus colaboradores.",
    bloodType: "Todos",
    progress: 89,
    goal: 150,
    daysLeft: 10
  },
  {
    id: 6,
    title: "SOS Hospital Infantil",
    image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?q=80&w=1000&auto=format&fit=crop",
    description: "Hospital Infantil precisa urgentemente de doações para crianças em tratamento.",
    bloodType: "AB-",
    progress: 12,
    goal: 40,
    daysLeft: 3
  }
];

const Campanhas = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-sangue-700">Campanhas de Doação</h1>
          <Link to="/criar-campanha">
            <Button className="bg-sangue-600 hover:bg-sangue-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Criar Campanha
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaignsMock.map((campaign) => (
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

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
};

export default Campanhas;
