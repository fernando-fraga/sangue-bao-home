
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CampaignCardProps {
  title: string;
  image: string;
  description: string;
  bloodType: string;
  progress: number;
  goal: number;
  daysLeft: number;
}

const CampaignCard = ({ title, image, description, bloodType, progress, goal, daysLeft }: CampaignCardProps) => {
  const percentage = Math.min(Math.round((progress / goal) * 100), 100);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold text-sangue-600">
          {bloodType}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{progress} doadores</span>
            <span className="text-muted-foreground">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-sangue-600 h-2.5 rounded-full" 
              style={{ width: `${percentage}%` }} 
            ></div>
          </div>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Meta: {goal} doadores</span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {daysLeft} dias restantes
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full border-sangue-600 text-sangue-600 hover:bg-sangue-50">
          Participar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
