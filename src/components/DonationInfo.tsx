
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DonationInfo = () => {
  const requirements = [
    "Estar em boas condições de saúde",
    "Ter entre 16 e 69 anos",
    "Pesar no mínimo 50kg",
    "Estar descansado e alimentado",
    "Apresentar documento oficial com foto",
    "Não estar em jejum"
  ];

  const steps = [
    {
      title: "Cadastro",
      description: "Apresente um documento de identidade com foto."
    },
    {
      title: "Triagem",
      description: "Responda a um questionário sobre sua saúde."
    },
    {
      title: "Teste de Anemia",
      description: "Um pequeno furo no dedo para análise do sangue."
    },
    {
      title: "Coleta",
      description: "A doação leva cerca de 15 minutos."
    },
    {
      title: "Lanche",
      description: "Hidrate-se e recupere energias após a doação."
    }
  ];

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Como Doar Sangue</h2>
          <p className="text-muted-foreground md:text-lg max-w-3xl">
            Doar sangue é um processo simples, rápido e seguro. Confira os requisitos e etapas para se tornar um doador.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-sangue-600">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                Requisitos para Doação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5 text-sangue-600 shrink-0">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-sangue-600">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M7 7h.01"></path>
                  <path d="M11 7h.01"></path>
                  <path d="M15 7h.01"></path>
                  <path d="M7 11h.01"></path>
                  <path d="M11 11h.01"></path>
                  <path d="M15 11h.01"></path>
                  <path d="M7 15h.01"></path>
                  <path d="M11 15h.01"></path>
                  <path d="M15 15h.01"></path>
                </svg>
                Etapas da Doação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-gray-200">
                {steps.map((step, index) => (
                  <li key={index} className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-sangue-600 rounded-full -left-3 text-white text-sm">
                      {index + 1}
                    </span>
                    <h3 className="font-medium text-gray-900">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DonationInfo;
