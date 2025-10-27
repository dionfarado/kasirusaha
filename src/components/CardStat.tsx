import { ReactNode } from "react";

interface Props {
    title: string;
    value: string | number;
    icon?: ReactNode;
}

export default function CardStat({ title, value, icon}: Props) {
    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{title}</p>
              <p className="text-xl font-bold">{value}</p>
            </div>
        {icon && <div className="text-green-500 text-2xl">{icon}</div>}
        </div>
    );
}