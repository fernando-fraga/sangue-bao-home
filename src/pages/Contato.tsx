
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido").optional(),
  subject: z.string().min(3, "Assunto deve ter pelo menos 3 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres")
});

type FormData = z.infer<typeof formSchema>;

const Contato = () => {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: FormData) => {
    // Here you would normally connect to a contact form service
    console.log("Contact form data:", data);
    
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em breve.",
    });
    
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-sangue-700 mb-6 text-center">Entre em Contato</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-md border-t-4 border-sangue-600">
                <CardHeader>
                  <CardTitle>Envie-nos uma mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo para entrar em contato com nossa equipe.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Nome completo</FormLabel>
                            <FormControl>
                              <div className="flex rounded-md ring-offset-background border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                <span className="flex items-center pl-3 text-muted-foreground">
                                  <User size={18} />
                                </span>
                                <Input placeholder="Seu nome completo" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">E-mail</FormLabel>
                              <FormControl>
                                <div className="flex rounded-md ring-offset-background border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                  <span className="flex items-center pl-3 text-muted-foreground">
                                    <Mail size={18} />
                                  </span>
                                  <Input placeholder="seu@email.com" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Telefone (opcional)</FormLabel>
                              <FormControl>
                                <div className="flex rounded-md ring-offset-background border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                  <span className="flex items-center pl-3 text-muted-foreground">
                                    <Phone size={18} />
                                  </span>
                                  <Input placeholder="(00) 00000-0000" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Assunto</FormLabel>
                            <FormControl>
                              <Input placeholder="Assunto da mensagem" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Mensagem</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Digite sua mensagem aqui..." 
                                className="resize-none min-h-[150px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full bg-sangue-600 hover:bg-sangue-700">
                        Enviar mensagem
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-md h-full">
                <CardHeader>
                  <CardTitle>Informações de contato</CardTitle>
                  <CardDescription>
                    Outras formas de entrar em contato conosco
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="text-sangue-600 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-medium">E-mail</h4>
                      <p className="text-muted-foreground">contato@sanguevital.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="text-sangue-600 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-medium">Telefone</h4>
                      <p className="text-muted-foreground">(11) 3456-7890</p>
                      <p className="text-muted-foreground">(11) 98765-4321</p>
                    </div>
                  </div>
                  
                  <Alert className="bg-sangue-50 border-sangue-200">
                    <AlertTitle className="text-sangue-700">Horário de atendimento</AlertTitle>
                    <AlertDescription className="text-sangue-600">
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 8h às 12h
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contato;
