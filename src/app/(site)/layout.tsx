import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TopStrip from "@/components/TopStrip";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <TopStrip />
      <SiteHeader />
      <div className="flex flex-col flex-1">{children}</div>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
