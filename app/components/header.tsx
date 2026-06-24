import Image from "next/image";

export default function Header() {

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] flex items-stretch h-16 bg-[#e8e6e0] border-b border-[#e8e6e0]">

            {/* linhas diagonais à esquerda */}
            <div
                className="flex-[0.12] rounded-lg border border-[#e8e6e0] bg-[#f5f4f0]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(45deg, #e8e6e0 0, #e8e6e0 1px, transparent 1px, transparent 11px)",
                }}
            />

            {/* container do logo (largura reduzida) */}
            <div className="flex flex-1 items-center overflow-hidden rounded-lg border border-[#e8e6e0] bg-[#f5f4f0] px-10">
                <Image src="/logo.png" alt="Logo" width={120} height={40} className="h-9 w-auto object-contain" priority />
            </div>

            <ul className="flex w-auto items-center gap-9 rounded-lg border border-[#e8e6e0] bg-[#f5f4f0] px-7">
                <li><a href="#" className="text-[11px]  uppercase text-zinc-950 font-medium no-underline transition-colors hover:text-[#0a0a0a]">Sobre</a></li>
                <li><a href="#" className="text-[11px]  uppercase text-zinc-950 font-medium no-underline transition-colors hover:text-[#0a0a0a]">Parceiros</a></li>
                <li><a href="#" className="text-[11px]  uppercase text-zinc-950 font-medium no-underline transition-colors hover:text-[#0a0a0a]">Lançamento</a></li>
            </ul>

            {/* espacinho que sobra na direita */}
            <div
                className="flex-[0.12] rounded-lg border border-[#e8e6e0] bg-[#f5f4f0]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(45deg, #e8e6e0 0, #e8e6e0 1px, transparent 1px, transparent 11px)",
                }}
            />
        </header>
    );
}