
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LayoutConteudo({ children }) {
    const pathname = usePathname();

    const esconderHeaderFooter =
        pathname === "/adminNoticias" ||
        pathname.startsWith("/adminNoticias/");

    return (
        <>
            {!esconderHeaderFooter && <Header />}

            <main>
                {children}
            </main>

            {!esconderHeaderFooter && <Footer />}
        </>
    );
}
