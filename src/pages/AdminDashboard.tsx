
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

// Mock data for campaigns pending approval
const pendingCampaigns = [
  { 
    id: 101, 
    title: "Campanha para Hospital São Lucas", 
    requestor: "Dr. Carlos Santos", 
    bloodType: "A+", 
    date: "10/05/2025"
  },
  { 
    id: 102, 
    title: "Ajuda para Maria Oliveira", 
    requestor: "Ana Oliveira", 
    bloodType: "O-", 
    date: "09/05/2025"
  },
  { 
    id: 103, 
    title: "SOS Hospital Infantil", 
    requestor: "Dra. Paula Mendes", 
    bloodType: "Todos", 
    date: "07/05/2025"
  },
];

// Mock data for active campaigns
const activeCampaigns = [
  { 
    id: 201, 
    title: "Campanha Emergencial Hospital Santa Maria", 
    bloodType: "O-", 
    progress: 45, 
    goal: 100, 
    daysLeft: 7 
  },
  { 
    id: 202, 
    title: "Doe Sangue para Maria Clara", 
    bloodType: "A+", 
    progress: 28, 
    goal: 50, 
    daysLeft: 14 
  },
  { 
    id: 203, 
    title: "Campanha Universitária de Doação", 
    bloodType: "Todos", 
    progress: 120, 
    goal: 200, 
    daysLeft: 21 
  },
];

// Mock data for blood inventory
const bloodInventory = [
  { type: "A+", level: 75, status: "Adequado" },
  { type: "A-", level: 45, status: "Alerta" },
  { type: "B+", level: 60, status: "Adequado" },
  { type: "B-", level: 25, status: "Crítico" },
  { type: "AB+", level: 70, status: "Adequado" },
  { type: "AB-", level: 30, status: "Alerta" },
  { type: "O+", level: 50, status: "Alerta" },
  { type: "O-", level: 15, status: "Crítico" },
];

// Mock data for user statistics
const userStats = [
  { id: 1, stat: "Usuários Registrados", value: 3240 },
  { id: 2, stat: "Doadores Ativos", value: 1876 },
  { id: 3, stat: "Campanhas Ativas", value: 18 },
  { id: 4, stat: "Doações Este Mês", value: 342 },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-sangue-700">Painel Administrativo</h1>
          <div className="flex gap-4">
            <Button variant="outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Exportar Relatório
            </Button>
            <Button className="bg-sangue-600 hover:bg-sangue-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Nova Campanha
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat) => (
            <Card key={stat.id}>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-muted-foreground">{stat.stat}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Estoque de Sangue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bloodInventory.map((blood) => (
                  <div key={blood.type} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Tipo {blood.type}</span>
                      <span 
                        className={`text-sm ${
                          blood.level < 30 
                            ? 'text-red-500' 
                            : blood.level < 60 
                              ? 'text-amber-500' 
                              : 'text-green-500'
                        }`}
                      >
                        {blood.status} ({blood.level}%)
                      </span>
                    </div>
                    <Progress 
                      value={blood.level} 
                      className={`h-2 ${
                        blood.level < 30 
                          ? 'bg-red-100' 
                          : blood.level < 60 
                            ? 'bg-amber-100' 
                            : 'bg-green-100'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-sangue-600 hover:bg-sangue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="m5 11 4-7"></path>
                    <path d="m19 11-4-7"></path>
                    <path d="M2 11h20"></path>
                    <path d="m5 11 4 8"></path>
                    <path d="m19 11-4 8"></path>
                    <path d="m2 11 10 2"></path>
                    <path d="m22 11-10 2"></path>
                  </svg>
                  Nova Campanha Emergencial
                </Button>
                <Button className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <line x1="19" y1="8" x2="19" y2="14"></line>
                    <line x1="22" y1="11" x2="16" y2="11"></line>
                  </svg>
                  Adicionar Usuário
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                  Agendar Campanha
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Exportar Relatório
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pendingApproval" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="pendingApproval">Aprovações Pendentes</TabsTrigger>
            <TabsTrigger value="activeCampaigns">Campanhas Ativas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pendingApproval">
            <Card>
              <CardHeader>
                <CardTitle>Campanhas Aguardando Aprovação</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Solicitante</TableHead>
                      <TableHead>Tipo Sanguíneo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>#{campaign.id}</TableCell>
                        <TableCell>{campaign.title}</TableCell>
                        <TableCell>{campaign.requestor}</TableCell>
                        <TableCell>{campaign.bloodType}</TableCell>
                        <TableCell>{campaign.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Ver</Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">Aprovar</Button>
                            <Button variant="destructive" size="sm">Rejeitar</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activeCampaigns">
            <Card>
              <CardHeader>
                <CardTitle>Campanhas Ativas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Tipo Sanguíneo</TableHead>
                      <TableHead>Progresso</TableHead>
                      <TableHead>Dias Restantes</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>#{campaign.id}</TableCell>
                        <TableCell>{campaign.title}</TableCell>
                        <TableCell>{campaign.bloodType}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex text-xs justify-between">
                              <span>{campaign.progress} de {campaign.goal}</span>
                              <span>{Math.round((campaign.progress / campaign.goal) * 100)}%</span>
                            </div>
                            <Progress value={(campaign.progress / campaign.goal) * 100} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{campaign.daysLeft} dias</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="destructive" size="sm">Remover</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
