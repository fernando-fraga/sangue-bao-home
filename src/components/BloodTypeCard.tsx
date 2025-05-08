
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface BloodTypeCardProps {
  type: string;
  level: number; // 0-100
  critical?: boolean;
}

const BloodTypeCard = ({ type, level, critical = false }: BloodTypeCardProps) => {
  let statusColor = "";
  let statusText = "";
  
  if (level <= 25) {
    statusColor = "bg-sangue-600";
    statusText = "Crítico";
  } else if (level <= 50) {
    statusColor = "bg-orange-500";
    statusText = "Alerta";
  } else if (level <= 75) {
    statusColor = "bg-yellow-500";
    statusText = "Estável";
  } else {
    statusColor = "bg-green-500";
    statusText = "Normal";
  }

  return (
    <Card className={`w-full overflow-hidden ${critical ? 'border-sangue-600 border-2 animate-pulse-slow' : ''}`}>
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div className="bg-sangue-100 py-3 px-4 text-center">
            <span className="text-4xl font-extrabold text-sangue-700">{type}</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-2 flex-1">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full ${statusColor}`} 
                style={{ width: `${level}%` }}
              ></div>
            </div>
            <div className="flex justify-between w-full text-sm">
              <span className="font-medium">Nível: {level}%</span>
              <span className={`font-semibold ${level <= 25 ? 'text-sangue-600' : level <= 50 ? 'text-orange-500' : level <= 75 ? 'text-yellow-500' : 'text-green-500'}`}>
                {statusText}
              </span>
            </div>
            {critical && (
              <div className="mt-2 bg-sangue-50 text-sangue-700 text-xs font-medium px-2 py-1 rounded text-center w-full">
                Doação Urgente!
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BloodTypeCard;
