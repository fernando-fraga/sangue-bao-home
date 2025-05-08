
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const formSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: FormData) => {
    // Here you would normally connect to authentication service
    console.log("Login attempt:", data);
    
    // Simulating login success notification
    toast({
      title: "Login realizado com sucesso!",
      description: "Você está sendo redirecionado...",
    });
    
    // Simulate redirect after login
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white shadow-lg border-t-4 border-sangue-600">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-sangue-700">Entrar</CardTitle>
            <CardDescription>
              Entre com seus dados para acessar sua conta
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                
                <Button type="submit" className="w-full bg-sangue-600 hover:bg-sangue-700">
                  Entrar
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 border-t pt-4">
            <p className="text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="text-sangue-600 hover:text-sangue-700 font-medium">
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Login;
