
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail, Phone, User, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Personal information schema
const personalInfoSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A confirmação de senha é obrigatória"),
});

// Blood donation information schema
const bloodDonationSchema = z.object({
  bloodType: z.string().min(1, "Tipo sanguíneo é obrigatório"),
  rhFactor: z.string().min(1, "Fator RH é obrigatório"),
  lastDonation: z.string().optional(),
  hasDonated: z.string().min(1, "Por favor, selecione uma opção"),
  canDonate: z.boolean().optional(),
  contraindications: z.array(z.string()).optional(),
});

// Terms schema
const termsSchema = z.object({
  terms: z.boolean().refine(val => val === true, {
    message: "Você precisa aceitar os termos e condições",
  }),
});

// Overall form schema combining all steps with refine for password match
const formSchema = z.object({
  ...personalInfoSchema.shape,
  ...bloodDonationSchema.shape,
  ...termsSchema.shape,
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      bloodType: "",
      rhFactor: "",
      lastDonation: "",
      hasDonated: "",
      canDonate: false,
      contraindications: [],
      terms: false,
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("Registration data:", data);
    
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Sua conta foi criada. Você pode fazer login agora.",
    });
    
    setTimeout(() => navigate("/login"), 2000);
  };

  const nextStep = async () => {
    let fieldsToValidate: string[] = [];
    
    // Determine which fields to validate based on current step
    if (step === 1) {
      fieldsToValidate = ["name", "email", "phone", "password", "confirmPassword"];
    } else if (step === 2) {
      fieldsToValidate = ["bloodType", "rhFactor", "hasDonated"];
    }
    
    // Validate the fields for the current step
    const result = await form.trigger(fieldsToValidate as any);
    if (result) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const contraindications = [
    "Infecção ou febre nos últimos 15 dias",
    "Procedimento dentário nas últimas 72 horas",
    "Tatuagem ou piercing nos últimos 12 meses",
    "Cirurgia nos últimos 6 meses",
    "Transfusão de sangue nos últimos 12 meses"
  ];

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
            
            {/* Step indicator */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full mx-1 ${
                    i + 1 === step ? "bg-sangue-600" : 
                    i + 1 < step ? "bg-sangue-400" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Passo {step} de {totalSteps}: {
                step === 1 ? "Informações Pessoais" : 
                step === 2 ? "Informações de Doação" : "Termos e Condições"
              }
            </p>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {step === 1 && (
                  <>
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
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-6 animate-fade-in">
                      <div className="flex gap-4">
                        <FormField
                          control={form.control}
                          name="bloodType"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-gray-700">Tipo Sanguíneo</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="A">A</SelectItem>
                                  <SelectItem value="B">B</SelectItem>
                                  <SelectItem value="AB">AB</SelectItem>
                                  <SelectItem value="O">O</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="rhFactor"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-gray-700">Fator RH</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="positive">Positivo (+)</SelectItem>
                                  <SelectItem value="negative">Negativo (-)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="hasDonated"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Já doou sangue antes?</FormLabel>
                            <FormControl>
                              <RadioGroup 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Sim
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="no" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Não
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("hasDonated") === "yes" && (
                        <FormField
                          control={form.control}
                          name="lastDonation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Data da última doação</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  className="w-full"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <div className="space-y-2">
                        <FormLabel className="text-gray-700">Contraindicações para doação</FormLabel>
                        <p className="text-sm text-muted-foreground">Marque as que se aplicam a você nos últimos meses:</p>
                        
                        {contraindications.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 py-2">
                            <Checkbox 
                              id={`contraindication-${index}`}
                              onCheckedChange={(checked) => {
                                const current = form.getValues("contraindications") || [];
                                if (checked) {
                                  form.setValue("contraindications", [...current, item]);
                                } else {
                                  form.setValue(
                                    "contraindications", 
                                    current.filter(i => i !== item)
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={`contraindication-${index}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {item}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
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
                )}
                
                <div className="flex justify-between mt-6">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                    >
                      Voltar
                    </Button>
                  )}
                  
                  <div className={`${step > 1 ? "ml-auto" : "w-full"}`}>
                    {step < totalSteps ? (
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="w-full bg-sangue-600 hover:bg-sangue-700"
                      >
                        Próximo
                      </Button>
                    ) : (
                      <Button 
                        type="submit"
                        className="w-full bg-sangue-600 hover:bg-sangue-700"
                      >
                        Cadastrar
                      </Button>
                    )}
                  </div>
                </div>
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
