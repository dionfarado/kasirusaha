import { Filter, Funnel, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export function RefreshFilter() {
    const[spinning, setSpinning] = useState(false)

    const handleClick = () => {
        setSpinning(true)
        setTimeout(() => {
            setSpinning(false)
        }, 1000)
    }

    
    return (
        <div className="flex items-center gap-2 ">
          <Button
           size="icon" 
           variant="outline"
           onClick={handleClick}
           disabled={spinning}
           >
            <RefreshCcw className={spinning ? "animate-spin" : ""} />
          </Button>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="cursor-pointer w-9 h-9"
                    >
                      <Funnel />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-74 p-4">
                    <div className="grid gap-2">
                      <div>
                        <Label className="mb-1">Proyek</Label>
                        <Select>
                          <SelectTrigger className="w-full hover:bg-gray-50">
                            <SelectValue placeholder="Pilih Proyek" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="mb-1">Outlet</Label>
                        <Select>
                          <SelectTrigger className="w-full hover:bg-gray-50">
                            <SelectValue placeholder="Pilih Outlet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="pt-2 flex justify-end gap-2">
                        <Button
                          variant="outline"
                          className="text-[12px] cursor-pointer"
                          size="sm"
                        >
                          Reset
                        </Button>
                        <Button
                          className="text-[12px] cursor-pointer"
                          size="sm"
                        >
                          Terapkan
                        </Button>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filter</p>
            </TooltipContent>
          </Tooltip>
        </div>
)
}