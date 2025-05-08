
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

const Sobre = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-sangue-700">Sobre o SangueVital</h1>
          
          <Card className="mb-8 shadow-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-sangue-600">Nossa Missão</h2>
              <p className="text-gray-700 mb-4">
                O SangueVital é uma plataforma dedicada a conectar doadores de sangue a pessoas e instituições que necessitam de doações, facilitando o processo e salvando vidas por todo o país.
              </p>
              <p className="text-gray-700">
                Nossa missão é aumentar o número de doadores regulares no Brasil, criando uma cultura de doação contínua e consciente, garantindo que os bancos de sangue estejam sempre abastecidos para emergências e tratamentos médicos.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8 shadow-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-sangue-600">Nossa História</h2>
              <p className="text-gray-700 mb-4">
                Fundada em 2022 por um grupo de profissionais de saúde e tecnologia, a SangueVital surgiu da necessidade de modernizar e facilitar o processo de doação de sangue no Brasil.
              </p>
              <p className="text-gray-700 mb-4">
                Após observar a queda constante nas doações e os períodos críticos de escassez nos bancos de sangue, decidimos criar uma plataforma que pudesse conectar de forma eficiente os potenciais doadores às campanhas e locais de doação.
              </p>
              <p className="text-gray-700">
                Desde então, já conectamos mais de 50.000 doadores, contribuindo para salvar aproximadamente 150.000 vidas através das doações realizadas.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8 shadow-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-sangue-600">Como Funcionamos</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-sangue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sangue-600">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Cadastro</h3>
                  <p className="text-sm text-gray-600">Crie sua conta e mantenha seus dados atualizados para doação.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-sangue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sangue-600">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Doação</h3>
                  <p className="text-sm text-gray-600">Participe de campanhas ou doe em hemonúcleos parceiros.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-sangue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sangue-600">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Impacto</h3>
                  <p className="text-sm text-gray-600">Acompanhe o impacto de suas doações na vida das pessoas.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-sangue-600">Entre em Contato</h2>
              <p className="text-gray-700 mb-4">
                Estamos sempre abertos para parcerias, sugestões e dúvidas. Entre em contato conosco através do formulário de contato ou pelos nossos canais de comunicação.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contato" className="px-6 py-2 bg-sangue-600 text-white rounded-md hover:bg-sangue-700 text-center">Formulário de Contato</a>
                <a href="mailto:contato@sanguevital.com" className="px-6 py-2 border border-sangue-600 text-sangue-600 rounded-md hover:bg-sangue-50 text-center">E-mail</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Sobre;
