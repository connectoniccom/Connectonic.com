import Link from 'next/link';
import { Home, User, Mail } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen border-r bg-background">
      <div className="h-full px-3 py-4">
         <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                My App
            </h2>
            <div className="space-y-1">
                <Link href="/" className="flex items-center justify-start p-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home</span>
                </Link>
                <Link href="#" className="flex items-center justify-start p-2 text-sm font-medium text-muted-foreground rounded-lg hover:bg-accent hover:text-accent-foreground">
                    <User className="mr-2 h-4 w-4" />
                    <span>About</span>
                </Link>
                <Link href="#" className="flex items-center justify-start p-2 text-sm font-medium text-muted-foreground rounded-lg hover:bg-accent hover:text-accent-foreground">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Contact</span>
                </Link>
            </div>
        </div>
      </div>
   </aside>
  );
};

export default Sidebar;
