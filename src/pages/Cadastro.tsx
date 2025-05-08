
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A confirmação de senha é obrigatória"),
  terms: z.boolean().refine(val => val === true, {
    message: "Você precisa aceitar os termos e condições",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    }
  });

  const onSubmit = (data: FormData) => {
    // Here you would normally connect to registration service
    console.log("Registration data:", data);
    
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Sua conta foi criada. Você pode fazer login agora.",
    });
    
    // Simulate redirect after registration
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white shadow-lg border-t-4 border-sangue-600">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-sangue-700">Cadastre-se</CardTitle>
            <CardDescription>
              Crie sua conta para ser um doador de sangue
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
                      <FormLabel className="text-gray-700">Telefone</FormLabel>
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
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Senha</FormLabel>
                      <FormControl>
                        <div className="flex rounded-md ring-offset-background border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                          <span className="flex items-center pl-3 text-muted-foreground">
                            <LogIn size={18} />
                          </span>
                          <Input type="password" placeholder="******" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Confirme sua senha</FormLabel>
                      <FormControl>
                        <div className="flex rounded-md ring-offset-background border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                          <span className="flex items-center pl-3 text-muted-foreground">
                            <LogIn size={18} />
                          </span>
                          <Input type="password" placeholder="******" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Eu concordo com os termos e condições
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-sangue-600 hover:bg-sangue-700">
                  Cadastrar
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 border-t pt-4">
            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-sangue-600 hover:text-sangue-700 font-medium">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Cadastro;
