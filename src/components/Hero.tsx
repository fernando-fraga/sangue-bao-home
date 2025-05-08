
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-sangue-50 to-white">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:w-1/2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Sua doação salva <span className="text-sangue-600">vidas</span>
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Uma única doação de sangue pode ajudar a salvar até três vidas. Seja um doador regular e faça a diferença.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button className="bg-sangue-600 hover:bg-sangue-700 text-white rounded-full px-8 py-6">
              Quero Doar
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-6 border-sangue-600 text-sangue-600 hover:bg-sangue-50">
              Criar Campanha
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
          <div className="relative w-full max-w-md aspect-[4/3]">
            <div className="absolute inset-0 bg-white rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Doação de sangue" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sangue-900/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium">Cada doação pode salvar até</p>
                <p className="text-2xl font-bold">3 vidas</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-sangue-600 text-white flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs font-medium">DOAR</p>
                <p className="text-lg font-bold">AGORA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
