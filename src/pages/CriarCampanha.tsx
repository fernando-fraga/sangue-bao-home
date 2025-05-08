
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
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";

// Define campaign form schema
const campaignSchema = z.object({
  title: z.string().min(5, "Título precisa ter pelo menos 5 caracteres"),
  description: z.string().min(20, "Descrição precisa ter pelo menos 20 caracteres"),
  bloodType: z.string().min(1, "Selecione um tipo sanguíneo"),
  goal: z.number().min(5, "A meta precisa ser de pelo menos 5 doadores"),
  endDate: z.string().min(1, "Selecione uma data final"),
  contactName: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  contactPhone: z.string().min(10, "Telefone inválido"),
  contactEmail: z.string().email("Email inválido"),
  hospitalName: z.string().min(3, "Nome do hospital/instituição é obrigatório"),
  campaignImage: z.any().optional(),
});

// Type for our form data
type CampaignFormValues = z.infer<typeof campaignSchema>;

const CriarCampanha = () => {
  const { toast } = useToast();
  const [goalValue, setGoalValue] = useState<number>(50);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
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
      campaignImage: undefined,
    },
  });

  // Update form goal value when slider changes
  React.useEffect(() => {
    form.setValue("goal", goalValue);
  }, [goalValue, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Update form value
      form.setValue("campaignImage", file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CampaignFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Campaign data:", data);
      
      // Show success message
      toast({
        title: "Campanha criada com sucesso!",
        description: "Sua campanha foi enviada para aprovação e logo estará disponível.",
      });
      
      // Redirect to campaigns page after success
      setTimeout(() => {
        navigate("/campanhas");
      }, 2000);
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Erro ao criar campanha",
        description: "Houve um problema ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                          <Input placeholder="Ex: Campanha urgente para João Silva" {...field} />
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
                          <Textarea 
                            className="w-full min-h-[120px]" 
                            placeholder="Descreva o objetivo da campanha, quem será beneficiado e por que as doações são necessárias."
                            {...field}
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
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                              onChange={handleImageChange}
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
                              <Input placeholder="Nome completo" {...field} />
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
                              <Input placeholder="(00) 00000-0000" {...field} />
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
                              <Input type="email" placeholder="seu@email.com" {...field} />
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
                              <Input placeholder="Nome da instituição" {...field} />
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

                  <CardFooter className="flex justify-end gap-4 px-0 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate("/campanhas")}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-sangue-600 hover:bg-sangue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Criando...
                        </>
                      ) : (
                        "Criar Campanha"
                      )}
                    </Button>
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
