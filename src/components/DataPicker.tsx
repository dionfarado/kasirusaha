"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronsDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { id } from "date-fns/locale";

type DataPickerProps = {
  onChange: (date: Date | undefined) => void;
};

export function DatePicker({ onChange }: DataPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleSelect = (selectDate: Date | undefined) => {
    setDate(selectDate);
    setOpen(false);
    if (onChange) {
      onChange(selectDate);
    }
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between font-normal w-48"
          >
            {date ? format(date, "d/M/yyyy", { locale: id }) : "Pilih tanggal"}
            <ChevronsDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={handleSelect}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
