
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const CriarCampanha = () => {
  const { toast } = useToast();
  const [goalValue, setGoalValue] = useState(50);
  const [previewImage, setPreviewImage] = useState("");

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      bloodType: "",
      goal: 50,
      endDate: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      hospitalName: "",
      campaignImage: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: any) => {
    toast({
      title: "Campanha criada com sucesso!",
      description: "Sua campanha foi enviada para aprovação.",
    });
    console.log("Form data:", data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-sangue-700">Criar Nova Campanha</h1>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Informações da Campanha</CardTitle>
              <CardDescription>
                Preencha os dados para criar uma campanha de doação de sangue. 
                Após enviar, nossa equipe irá revisar e aprovar sua campanha.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Campanha*</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Campanha urgente para João Silva" {...field} required />
                        </FormControl>
                        <FormDescription>
                          Escolha um título claro e objetivo para sua campanha.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição*</FormLabel>
                        <FormControl>
                          <textarea 
                            className="w-full min-h-[120px] p-3 border rounded-md" 
                            placeholder="Descreva o objetivo da campanha, quem será beneficiado e por que as doações são necessárias."
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormDescription>
                          Forneça detalhes relevantes sobre a necessidade da doação.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo Sanguíneo*</FormLabel>
                          <FormControl>
                            <select 
                              className="w-full p-2 border rounded-md" 
                              {...field}
                              required
                            >
                              <option value="">Selecione um tipo</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                              <option value="Todos">Todos os tipos</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Final*</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormItem>
                    <FormLabel>Meta de Doadores: {goalValue}</FormLabel>
                    <div className="pt-4 pb-2">
                      <Slider 
                        defaultValue={[goalValue]} 
                        min={5} 
                        max={500}
                        step={5}
                        onValueChange={(value) => setGoalValue(value[0])}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5</span>
                      <span>100</span>
                      <span>250</span>
                      <span>500</span>
                    </div>
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="campaignImage"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Imagem da Campanha</FormLabel>
                        <FormControl>
                          <div>
                            <Input 
                              id="campaignImage" 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => {
                                handleImageChange(e);
                                onChange(e.target.files?.[0]);
                              }}
                              {...fieldProps}
                            />
                            {previewImage && (
                              <div className="mt-4">
                                <p className="text-sm mb-2">Pré-visualização:</p>
                                <img 
                                  src={previewImage} 
                                  alt="Preview" 
                                  className="w-full max-h-48 object-cover rounded-md" 
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Adicione uma imagem para sua campanha (opcional).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Informações de Contato</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Responsável*</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome completo" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone*</FormLabel>
                            <FormControl>
                              <Input placeholder="(00) 00000-0000" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email*</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="seu@email.com" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hospitalName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hospital/Instituição*</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome da instituição" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-2">Prévia da Campanha</h3>
                    <p className="text-sm text-muted-foreground mb-4">Assim que sua campanha for aprovada, ela aparecerá assim:</p>
                    
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <div className="font-medium text-lg mb-2">{form.watch("title") || "Título da Campanha"}</div>
                      <div className="text-sm text-gray-600 mb-4 line-clamp-2">{form.watch("description") || "Descrição da campanha aparecerá aqui."}</div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">0 doadores</span>
                          <span className="text-muted-foreground">0%</span>
                        </div>
                        <Progress value={0} className="h-2" />
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>Meta: {goalValue} doadores</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardFooter className="flex justify-end gap-4 px-0">
                    <Button type="button" variant="outline">Cancelar</Button>
                    <Button type="submit" className="bg-sangue-600 hover:bg-sangue-700">Criar Campanha</Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CriarCampanha;
