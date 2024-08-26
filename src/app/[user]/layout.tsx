import Aside from "@/ui/aside";

export default function RootLayout({ children,
    params: {
        user = ''
    }
}: {
    children: React.ReactNode;
    params: {
        user: string
    }
}) {


    return (
        <div className="flex">

            <Aside user={user} />

            <main className="w-full flex-grow border">
                {children}
            </main>
        </div>
    );
}