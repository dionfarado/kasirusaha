"use client"

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import SidebarInner from "./SidebarInner"
import React from "react"

const MobileSidebar =({ dataActive, user }: any) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
             <Button
             variant="ghost"
             size="icon"
             className="lg:hidden"
             >
                <menu className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
             </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SidebarInner user={user} dataActive={dataActive} />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar